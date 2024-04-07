import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSellersPoint,
  getInvoiceEveryTA,
} from "../store/reducers/requestSlice";
import { useEffect, useState } from "react";
import { ViewButton } from "../customsTags/ViewButton";
import { changeEveryInvoiceTA } from "../store/reducers/stateSlice";
import { EveryInvoiceTA } from "../components/TAComponents/EveryInvoiceTA";
import { ModalCreateInvoice } from "../components/TAComponents/ModalCreateInvoice";

export const MyShipmentScreen = ({ navigation }) => {
  const [modalState, setModalState] = useState(false);

  const dispatch = useDispatch();

  const { createEveryInvoiceTA } = useSelector((state) => state.stateSlice);

  const { preloader, listSellersPoints, listInvoiceEveryTA } = useSelector(
    (state) => state.requestSlice
  );

  const agent_guid = "b3120f36-3fcd-4ca0-8346-484881974846";

  useEffect(() => {
    getData();
    dispatch(
      changeEveryInvoiceTA({
        ...createEveryInvoiceTA,
        seller_guid: listSellersPoints?.[0]?.value,
      })
    );
  }, []);

  const getData = () => {
    dispatch(getAllSellersPoint(agent_guid));
    dispatch(getInvoiceEveryTA(agent_guid));
  };

  return (
    <>
      <View style={styles.parentBlock}>
        <SafeAreaView>
          <View style={{ padding: 10 }}>
            <ViewButton
              styles={[styles.sendBtn, styles.sendBtnMore]}
              onclick={() => setModalState(true)}
            >
              + Создать накладную
            </ViewButton>
          </View>
          {listInvoiceEveryTA?.length === 0 ? (
            <Text style={styles.noneData}>Список накладных пустой</Text>
          ) : (
            <View style={{ paddingBottom: 180 }}>
              <FlatList
                contentContainerStyle={styles.flatListStyle}
                data={listInvoiceEveryTA}
                renderItem={({ item }) => (
                  <EveryInvoiceTA obj={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item.codeid}
                refreshControl={
                  <RefreshControl
                    refreshing={preloader}
                    onRefresh={() => getData()}
                  />
                }
              />
            </View>
          )}
        </SafeAreaView>
      </View>
      <ModalCreateInvoice
        modalState={modalState}
        setModalState={setModalState}
        navigation={navigation}
      />
    </>
  );
};
const styles = StyleSheet.create({
  parentBlock: {
    flex: 1,
    backgroundColor: "#ebeef2",
  },

  noneData: {
    flex: 1,
    height: 500,
    paddingTop: 250,
    textAlign: "center",
    fontSize: 20,
  },

  sendBtn: {
    backgroundColor: "#fff",
    color: "rgba(97 ,100, 239,0.7)",
    minWidth: "100%",
    paddingTop: 10,
    borderRadius: 10,
    fontWeight: 600,
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    marginTop: 10,
  },
  sendBtnMore: {
    marginBottom: 10,
  },
  flatListStyle: {
    minWidth: "100%",
    width: "100%",
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.587)",
  },
});
