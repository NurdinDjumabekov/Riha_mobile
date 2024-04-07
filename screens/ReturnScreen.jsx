import { useEffect } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins, getHistoryReturn } from "../store/reducers/requestSlice";
import { ViewButton } from "../customsTags/ViewButton";
import { FlatList } from "react-native";
import { ModalChoiceReturn } from "../components/ReturnProducts/ModalChoiceReturn";
import { changeReturnInvoice } from "../store/reducers/stateSlice";
import { EveryInvoiceReturn } from "../components/ReturnProducts/EveryInvoiceReturn";
import { Text } from "react-native";

export const ReturnScreen = ({ navigation }) => {
  //// возрат товара
  const dispatch = useDispatch();

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  const { createReturnInvoice } = useSelector((state) => state.stateSlice);
  const { preloader, listSellersPoints, listHistoryReturn } = useSelector(
    (state) => state.requestSlice
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getHistoryReturn(agent_guid));
    dispatch(getAllAdmins(agent_guid));
  };

  const createInvoice = () => {
    dispatch(
      changeReturnInvoice({
        ...createReturnInvoice,
        stateModal: true,
        agent_guid,
      })
    );
  };
  // console.log(listSellersPoints, "listSellersPoints");
  const list = [
    {
      agent_guid: "B3120F36-3FCD-4CA0-8346-484881974846",
      seller_guid: "E7458A29-6F7F-4364-A96D-ED878812F0CF",
      status: 2,
      guid: "76A690DA-F00E-4071-A8A1-8661BA17937A",
      total_price: 1080,
      total_weight: 6,
      comment: "Тестовая",
      date: "04.04.2024 11:17",
      seller: "Админ",
      agent: "Джумабеков Нурдин",
      point: "Торговая Точка",
      point_guid: "E7458A29-6F7F-4364-A96D-ED878812F0CF",
      codeid: 1,
      seller_fio: "Админ",
    },
    {
      agent_guid: "B3120F36-3FCD-4CA0-8346-484881974846",
      seller_guid: "E7458A29-6F7F-4364-A96D-ED878812F0CF",
      status: 2,
      guid: "76A690DA-F00E-4071-A8A1-8661BA17937A",
      total_price: 1080,
      total_weight: 6,
      comment: "Тестовая",
      date: "04.04.2024 11:17",
      seller: "Админ",
      agent: "Джумабеков Нурдин",
      point: "Торговая Точка",
      point_guid: "E7458A29-6F7F-4364-A96D-ED878812F0CF",
      codeid: 2,
      seller_fio: "Админ",
    },
    {
      agent_guid: "B3120F36-3FCD-4CA0-8346-484881974846",
      seller_guid: "E7458A29-6F7F-4364-A96D-ED878812F0CF",
      status: 2,
      guid: "76A690DA-F00E-4071-A8A1-8661BA17937A",
      total_price: 1080,
      total_weight: 6,
      comment: "Тестовая",
      date: "04.04.2024 11:17",
      seller: "Админ",
      agent: "Джумабеков Нурдин",
      point: "Торговая Точка",
      point_guid: "E7458A29-6F7F-4364-A96D-ED878812F0CF",
      codeid: 3,
      seller_fio: "Админ",
    },
  ];

  const empty = list?.length !== 0;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.returnBlock}>
          <ViewButton styles={styles.return} onclick={createInvoice}>
            + Создать накладную для возврата товара
          </ViewButton>
        </View>
        {empty && <Text style={styles.title}>История возврата товара </Text>}
        <View style={styles.blockList}>
          <FlatList
            contentContainerStyle={styles.flatListStyle}
            // data={listHistoryReturn}
            data={list}
            renderItem={({ item }) => (
              <EveryInvoiceReturn obj={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.codeid}
            refreshControl={
              <RefreshControl refreshing={preloader} onRefresh={getData} />
            }
          />
        </View>
      </View>
      <ModalChoiceReturn navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  flatListStyle: {
    minWidth: "100%",
    width: "100%",
    paddingBottom: 20,
    // borderTopWidth: 1,
    // borderColor: "rgba(47, 71, 190, 0.587)",
  },

  returnBlock: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "100%",
  },

  return: {
    fontSize: 16,
    color: "#fff",
    minWidth: "95%",
    paddingTop: 10,
    borderRadius: 10,
    fontWeight: 600,
    backgroundColor: "rgba(97 ,100, 239,0.7)",
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 3,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "#fff",
  },

  blockList: {
    flex: 1,
  },
});
