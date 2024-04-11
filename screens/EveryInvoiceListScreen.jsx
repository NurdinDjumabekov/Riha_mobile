import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EveryProduct } from "../components/EveryProduct";
import { ViewButton } from "../customsTags/ViewButton";
import ConfirmationModal from "../components/ConfirmationModal";
import {
  sendProdInvoiceTT,
  getListExpenses,
} from "../store/reducers/requestSlice";
import { changeAmountExpenses } from "../store/reducers/stateSlice";
import { formatCount } from "../helpers/formatCount";

export const EveryInvoiceListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { codeid, guid, seller_guid } = route.params;
  const [modal, setModal] = useState(false);
  const { listProductForTT } = useSelector((state) => state.stateSlice);
  const { listExpenses } = useSelector((state) => state.requestSlice);

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
    dispatch(sendProdInvoiceTT({ guid, navigation }));
    setModal(false);
  };

  const totalSum = listProductForTT?.reduce((total, item) => {
    return +item?.price * +item?.count + total;
  }, 0);

  const widthMax = { minWidth: "100%", width: "100%" };
  const noneData = listProductForTT?.length === 0;
  const checkEmpty = listProductForTT?.length !== 0;

  // console.log(listProductForTT, "listProductForTT");

  return (
    <>
      <View style={styles.container}>
        {noneData ? (
          <></>
        ) : (
          <SafeAreaView style={{ maxHeight: "80%" }}>
            <Text style={styles.titleExpenses}>Список товаров</Text>
            <FlatList
              contentContainerStyle={widthMax}
              data={listProductForTT}
              renderItem={({ item, index }) => (
                <EveryProduct obj={item} index={index} type="simpleList" />
              )}
              keyExtractor={(item, ind) => `${item.guid}${ind}`}
            />

            <Text style={styles.resultSum}>
              Итого: {formatCount(totalSum)} сом
            </Text>
          </SafeAreaView>
        )}
        {checkEmpty && (
          <ViewButton styles={styles.sendBtn} onclick={() => setModal(true)}>
            Подтвердить отправку
          </ViewButton>
        )}
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
    minWidth: "95%",
    // paddingHorizontal: 20,
    marginTop: 20,
    marginRight: 0,
    paddingBottom: 13,
    paddingTop: 13,
    borderRadius: 7,
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
