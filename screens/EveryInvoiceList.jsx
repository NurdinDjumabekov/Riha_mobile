import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EveryProduct } from "../components/EveryProduct";
import { ViewButton } from "../customsTags/ViewButton";
import { changeListProductForTT } from "../store/reducers/stateSlice";
import ConfirmationModal from "../components/ConfirmationModal";
import {
  addProdInvoiceTT,
  getCategoryTA,
} from "../store/reducers/requestSlice";

export const EveryInvoiceList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { codeid, guid } = route.params;
  const [modal, setModal] = useState(false);
  const { listProductForTT } = useSelector((state) => state.stateSlice);
  const { preloader } = useSelector((state) => state.requestSlice);

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  useEffect(() => {
    // getData();
    navigation.setOptions({
      title: `Накладная №${codeid}`,
    });

    // return () => dispatch(changeTemporaryData({})); /// очищаю временный state
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

  const widthMax = { minWidth: "100%", width: "100%" };
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.parentBlock}>
          <FlatList
            contentContainerStyle={widthMax}
            data={listProductForTT}
            renderItem={({ item, index }) => (
              <EveryProduct obj={item} index={index} type="simpleList" />
            )}
            keyExtractor={(item, ind) => `${item.guid}${ind}`}
            // refreshControl={
            //   <RefreshControl refreshing={preloader} onRefresh={getData} />
            // }
          />
          {listProductForTT?.length !== 0 && (
            <ViewButton styles={styles.sendBtn} onclick={() => setModal(true)}>
              Подтвердить
            </ViewButton>
          )}
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
    backgroundColor: "#d4dfee",
    padding: 10,
    paddingRight: 5,
    paddingLeft: 5,
  },
  sendBtn: {
    backgroundColor: "rgba(95, 230, 165, 0.99)",
    color: "#fff",
    marginTop: 20,
  },
});
