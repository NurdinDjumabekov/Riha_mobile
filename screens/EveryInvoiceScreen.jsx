import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  sendProdInvoiceTT,
  getCategoryTA,
  getProductTA,
} from "../store/reducers/requestSlice";
import { EveryProduct } from "../components/EveryProduct";
import {
  changeStateForCategory,
  changeTemporaryData,
} from "../store/reducers/stateSlice";
import ConfirmationModal from "../components/ConfirmationModal";
import { EveryCategoryInner } from "../components/TAComponents/EveryCategoryInner";
import { useFocusEffect } from "@react-navigation/native";

export const EveryInvoiceScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { codeid, guid, seller_guid } = route.params; /// guid накладной и  seller_guid точки(магазина)
  const [modal, setModal] = useState(false);
  const [openKeyBoard, setOpenKeyBoard] = useState(false);
  const { listProductForTT } = useSelector((state) => state.stateSlice);
  const { preloader, listCategoryTA, listProductTA } = useSelector(
    (state) => state.requestSlice
  );

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  // useEffect(() => {
  //   getData();
  //   navigation.setOptions({
  //     title: `Накладная №${codeid}`,
  //   });
  //   dispatch(changeStateForCategory("0"));
  // }, [guid]);

  useFocusEffect(
    useCallback(() => {
      getData();
      navigation.setOptions({
        title: `Накладная №${codeid}`,
      });
      dispatch(changeStateForCategory("0"));
    }, [])
  );

  const getData = async () => {
    await dispatch(getCategoryTA(agent_guid));
    await dispatch(getProductTA({ guid: "0", agent_guid })); /// 0 - все продукты
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
    dispatch(sendProdInvoiceTT({ data, navigation }));
    setModal(false);
  };

  const moreList = () => {
    navigation.navigate("everyInvoiceList", {
      codeid,
      guid,
      seller_guid,
    });
    dispatch(changeTemporaryData({}));
  };

  useEffect(() => {
    /// события открытия клавиатуры
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setOpenKeyBoard(true)
    );
    /// события закрытия клавиатуры
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setOpenKeyBoard(false)
    );
    // Удаление слушателей после использования
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const checkLength = listProductTA?.length >= 3;

  const widthMax = { minWidth: "100%", width: "100%" };
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.parentBlock}>
          <TouchableOpacity onPress={moreList} style={styles.arrow}>
            <Text style={styles.textBtn}>Список товаров</Text>
            <View style={styles.arrowInner}></View>
          </TouchableOpacity>
          <View style={styles.parentSelectBlock}>
            <View style={styles.selectBlock}>
              <Text style={styles.textCateg}>Категории</Text>
              <FlatList
                contentContainerStyle={widthMax}
                data={listCategoryTA}
                renderItem={({ item }) => <EveryCategoryInner obj={item} />}
                keyExtractor={(item, ind) => `${item.guid}${ind}`}
                // refreshControl={
                //   <RefreshControl refreshing={preloader} onRefresh={getData} />
                // }
              />
            </View>
          </View>
          <Text style={[styles.textCateg, styles.textTovar]}>Товары</Text>
          <View
            style={[
              styles.blockSelectProd,
              openKeyBoard && checkLength && styles.paddingB50,
            ]}
          >
            <FlatList
              contentContainerStyle={widthMax}
              data={listProductTA}
              renderItem={({ item, index }) => (
                <EveryProduct obj={item} index={index} guidInvoice={guid} />
              )}
              keyExtractor={(item, ind) => `${item.guid}${ind}`}
              refreshControl={
                <RefreshControl refreshing={preloader} onRefresh={getData} />
              }
            />
          </View>
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

  selectBlock: {
    backgroundColor: "#fff",
    marginTop: 5,
    marginBottom: 5,
    borderStyle: "solid",
    borderRadius: 3,
    width: "100%",
    maxHeight: 250,
  },
  parentBlock: {
    flex: 1,
    position: "relative",
    backgroundColor: "rgba(162, 178, 238, 0.102)",
  },
  arrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "rgba(12, 169, 70, 0.486)",
    marginBottom: 0,
  },
  arrowInner: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#fff",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
    marginTop: 5,
  },
  textBtn: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
  },

  actionBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },

  textCateg: {
    padding: 8,
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
  textTovar: {
    backgroundColor: "#fff",
  },
  blockSelectProd: {
    minHeight: "30%",
    overflow: "scroll",
    height: "50%",
  },
  paddingB50: {
    paddingBottom: 95,
  },
});
