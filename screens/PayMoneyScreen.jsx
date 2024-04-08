import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellersPoint } from "../store/reducers/requestSlice";
import { SafeAreaView } from "react-native";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native";
import { ModalPayTA } from "../components/ModalPayTA";
import { changeTempGuidPoint } from "../store/reducers/stateSlice";

export const PayMoneyScreen = () => {
  //// оплата ТА (принятие денег ТА)
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  const { temporaryGuidPoint } = useSelector((state) => state.stateSlice);
  const { preloader, listSellersPoints } = useSelector(
    (state) => state.requestSlice
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getAllSellersPoint(agent_guid));
  };

  const choiceSelect = (seller_guid) => {
    dispatch(
      changeTempGuidPoint({
        ...temporaryGuidPoint,
        seller_guid,
        agent_guid,
      })
    ); //// ложу guid точки
    setModalState(true);
  };

  // console.log(listSellersPoints, "listSellersPoints");
  const widthMax = { minWidth: "100%", width: "100%" };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.selectBlock}>
          <Text style={styles.title}>Выберите торговую точку</Text>
          <FlatList
            contentContainerStyle={widthMax}
            data={listSellersPoints}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.everyPoint}
                onPress={() => choiceSelect(item?.value)}
              >
                <Text style={styles.titleNum}>
                  {index + 1}. {item.label}
                </Text>
                <View style={styles.arrow}></View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, ind) => `${item.guid}${ind}`}
            refreshControl={
              <RefreshControl refreshing={preloader} onRefresh={getData} />
            }
          />
        </View>
      </SafeAreaView>
      <ModalPayTA modalState={modalState} setModalState={setModalState} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 8,
    fontSize: 18,
    fontWeight: "500",
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "rgba(47, 71, 190, 0.591)",
    color: "#fff",
    // marginBottom: 5,
  },

  everyPoint: {
    backgroundColor: "rgba(162, 178, 238, 0.102)",
    minWidth: "100%",
    padding: 8,
    paddingBottom: 13,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.287)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleNum: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.672)",
  },

  activeCateg: {
    backgroundColor: "rgba(47, 71, 190, 0.672)",
    color: "#fff",
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "rgba(47, 71, 190, 0.272)",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
  },

  activeArrow: {
    borderColor: "#fff",
  },
});
