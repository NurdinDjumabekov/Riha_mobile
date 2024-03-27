import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addProdInvoiceTT,
  getCategoryTA,
  getProductTA,
} from "../store/reducers/requestSlice";
import { EveryProduct } from "../components/EveryProduct";
import { ViewButton } from "../customsTags/ViewButton";
import {
  changeListProductForTT,
  changeTemporaryData,
} from "../store/reducers/stateSlice";
import ConfirmationModal from "../components/ConfirmationModal";
import { EveryCategoryInner } from "../components/TAComponents/EveryCategoryInner";

export const EveryInvoice = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { codeid, guid } = route.params;
  const [modal, setModal] = useState(false);
  const { listProductForTT } = useSelector((state) => state.stateSlice);
  const { preloader, listCategoryTA, listProductTA } = useSelector(
    (state) => state.requestSlice
  );

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  useEffect(() => {
    getData();
    navigation.setOptions({
      title: `Накладная №${codeid}`,
    });
  }, [guid]);

  const getData = async () => {
    await dispatch(getCategoryTA(agent_guid));
    await dispatch(
      getProductTA({
        guid: "0",
        agent_guid: agent_guid,
      })
    ); /// 0 - все продукты
    dispatch(changeListProductForTT([]));
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
    };
    dispatch(addProdInvoiceTT({ data, navigation }));
    setModal(false);
  };

  const moreList = () => {
    navigation.navigate("everyInvoiceList", {
      codeid,
      guid,
    });
    dispatch(changeTemporaryData({}));
  };
  const widthMax = { minWidth: "100%", width: "100%" };
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.parentBlock}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={moreList}
          ></TouchableOpacity>
          <View style={styles.parentSelectBlock}>
            <View style={styles.selectBlock}>
              <Text style={styles.textCateg}>Категории</Text>
              <FlatList
                contentContainerStyle={widthMax}
                data={listCategoryTA}
                renderItem={({ item, index }) => (
                  <EveryCategoryInner obj={item} />
                )}
                keyExtractor={(item, ind) => `${item.guid}${ind}`}
                refreshControl={
                  <RefreshControl refreshing={preloader} onRefresh={getData} />
                }
              />
            </View>
          </View>
          <Text style={[styles.textCateg, styles.textTovar]}>Товары</Text>
          <FlatList
            contentContainerStyle={widthMax}
            data={listProductTA}
            renderItem={({ item, index }) => (
              <EveryProduct obj={item} index={index} />
            )}
            // keyExtractor={(item) => item.guid}
            keyExtractor={(item, ind) => `${item.guid}${ind}`}
            refreshControl={
              <RefreshControl refreshing={preloader} onRefresh={getData} />
            }
          />
        </SafeAreaView>
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
    backgroundColor: "#fff",
  },
  parentSelectBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  parentBlock: {
    flex: 1,
    position: "relative",
    backgroundColor: "rgba(162, 178, 238, 0.102)",
  },
  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "rgba(162, 178, 238, 0.439)",
    height: 30,
    width: 30,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
  },
  actionBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },

  selectBlock: {
    backgroundColor: "#fff",
    marginTop: 5,
    marginBottom: 5,
    borderStyle: "solid",
    // borderWidth: 2,
    // borderColor: "rgb(217 223 232)",
    borderRadius: 3,
    width: "100%",
    height: 250,
  },
  textCateg: {
    padding: 8,
    fontSize: 18,
    fontWeight: "500",
    // backgroundColor: "rgba(162, 178, 238, 0.439)",
    // color: "rgba(97 ,100, 239,0.7)",
  },
  textTovar: {
    borderTopColor: "rgba(97 ,100, 239,0.7)",
    borderTopWidth: 2,
    paddingBottom: 0,
    paddingTop: 12,
  },
});
