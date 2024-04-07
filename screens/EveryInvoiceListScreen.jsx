import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EveryProduct } from "../components/EveryProduct";
import { ViewButton } from "../customsTags/ViewButton";
import ConfirmationModal from "../components/ConfirmationModal";
import {
  addProdInvoiceTT,
  getListExpenses,
} from "../store/reducers/requestSlice";
import { ListExpense } from "../components/ListExpense";
import { changeAmountExpenses } from "../store/reducers/stateSlice";

export const EveryInvoiceListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { codeid, guid, seller_guid } = route.params;
  const [modal, setModal] = useState(false);
  const { listProductForTT, amountExpenses } = useSelector(
    (state) => state.stateSlice
  );
  const { listExpenses } = useSelector((state) => state.requestSlice);

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  useEffect(() => {
    navigation.setOptions({
      title: `Накладная №${codeid}`,
    });
    getData();
  }, []);

  const sumExpenses = listExpenses?.reduce((total, item) => {
    return +item.amount + total;
  }, 0); //// сумма трат(расходов) ТТ

  const getData = () => {
    dispatch(getListExpenses(seller_guid));
    dispatch(changeAmountExpenses(sumExpenses));
  };

  const sendData = () => {
    const data = {
      invoice_guid: guid,
      products: listProductForTT?.map((i) => {
        return {
          guid: i.guid,
          count: i.ves,
          price: i.price,
        };
      }),
      seller_guid,
      amount: amountExpenses || 0,
      agent_guid,
    };
    dispatch(addProdInvoiceTT({ data, navigation }));
    setModal(false);
  };

  const onChange = (text) => {
    if (/^\d*\.?\d*$/.test(text) || text === "") {
      dispatch(changeAmountExpenses(text));
    }
  };

  const totalSum = listProductForTT?.reduce((total, item) => {
    return +item.price * +item.ves + total;
  }, 0);

  const widthMax = { minWidth: "100%", width: "100%" };
  const noneData = listProductForTT?.length === 0;
  const checkEmpty =
    listProductForTT?.length !== 0 || listExpenses?.length !== 0;

  const checkList = listExpenses?.length !== 0;
  return (
    <>
      <View style={styles.container}>
        {noneData ? (
          <></>
        ) : (
          <SafeAreaView style={{ maxHeight: "50%" }}>
            <Text style={styles.titleExpenses}>Список товаров</Text>
            <FlatList
              contentContainerStyle={widthMax}
              data={listProductForTT}
              // data={[...listProductForTT,...listProductForTT,...listProductForTT,...listProductForTT]}
              renderItem={({ item, index }) => (
                <EveryProduct obj={item} index={index} type="simpleList" />
              )}
              keyExtractor={(item, ind) => `${item.guid}${ind}`}
            />
            <Text style={styles.resultSum}>Итого: {totalSum} сом</Text>
          </SafeAreaView>
        )}
        {checkList && (
          <View style={{ maxHeight: 290 }}>
            <ListExpense getData={getData} />
          </View>
        )}
        <View style={[styles.sendBlock, checkList && styles.empty]}>
          {checkList && (
            <View>
              <Text style={styles.sumExpenses}>Сумма расходов</Text>
              <TextInput
                style={styles.input}
                value={amountExpenses?.toString()}
                onChangeText={onChange}
                keyboardType="numeric"
                maxLength={7}
                placeholder="Сумма"
              />
            </View>
          )}
          {checkEmpty && (
            <ViewButton
              styles={[styles.sendBtn, !checkList && styles.moreSendBtn]}
              onclick={() => setModal(true)}
            >
              Подтвердить
            </ViewButton>
          )}
        </View>
      </View>
      {/* /// для подтверждения отправки */}
      <ConfirmationModal
        visible={modal}
        message="Подтвердить ?"
        onYes={sendData}
        onNo={() => setModal(false)}
        onClose={() => setModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4dfee",
    padding: 1,
    paddingRight: 0,
    paddingLeft: 0,
    position: "relative",
  },

  noneData: {
    paddingVertical: 100,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    backgroundColor: "#fff",
  },

  titleExpenses: {
    fontSize: 17,
    fontWeight: "500",
    padding: 15,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
    backgroundColor: "rgba(47, 71, 190, 0.191)",
    color: "#222",
  },

  sendBlock: {
    backgroundColor: "#d4dfee",
    width: "100%",
    minHeight: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "rgba(47, 71, 190, 0.087)",
    // backgroundColor: "red",
    paddingBottom: 10,
    paddingTop: 5,
  },

  empty: {},

  sumExpenses: {
    fontSize: 14,
    fontWeight: "400",
    paddingBottom: 3,
  },

  input: {
    width: 120,
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  sendBtn: {
    backgroundColor: "rgba(95, 230, 165, 0.99)",
    color: "#fff",
    alignSelf: "center",
    fontSize: 17,
    minWidth: "65%",
    // paddingHorizontal: 20,
    marginTop: 0,
    marginRight: 0,
    paddingBottom: 9,
    paddingTop: 9,
    borderRadius: 7,
  },

  moreSendBtn: {
    minWidth: "100%",
    paddingBottom: 13,
    paddingTop: 13,
  },

  resultSum: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    backgroundColor: "rgba(47, 71, 190, 0.191)",
    textAlign: "right",
    padding: 20,
    paddingVertical: 8,
    // color: "rgba(12, 169, 70, 0.9)"
  },

  emptyAll: {
    backgroundColor: "#d4dfee",
    paddingVertical: 300,
  },
});
