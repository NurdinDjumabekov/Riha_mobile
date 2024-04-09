import { SafeAreaView, FlatList, RefreshControl, View } from "react-native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { dataCategory } from "../helpers/Data";
import { EveryCategory } from "../components/EveryCategory";
import { useDispatch, useSelector } from "react-redux";
import { changePreloader, getBalance } from "../store/reducers/requestSlice";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const MainScreen = ({ navigation }) => {
  const { token } = useSelector((state) => state.saveDataSlice);
  const { preloader, balance } = useSelector((state) => state.requestSlice);
  const dispatch = useDispatch();

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = () => {
    dispatch(getBalance(agent_guid));
  };

  return (
    <View style={styles.parentBlock}>
      <ViewContainer>
        <SafeAreaView>
          <View style={styles.childBlock}>
            <View style={styles.balance}>
              <View>
                <View style={styles.balanceInner}>
                  <Text style={styles.balanceText}>Баланс</Text>
                  <View style={styles.arrow}></View>
                </View>
                <Text style={styles.balanceNum}>{balance} сом</Text>
              </View>
              <Text style={styles.balanceHistory}>История</Text>
            </View>
            <FlatList
              contentContainerStyle={styles.flatList}
              data={dataCategory}
              renderItem={({ item }) => (
                <EveryCategory obj={item} navigation={navigation} />
              )}
              // keyExtractor={(item) => item.codeid}
              numColumns={2}
              refreshControl={
                <RefreshControl refreshing={preloader} onRefresh={getData} />
              }
            />
          </View>
        </SafeAreaView>
      </ViewContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  parentBlock: {
    minWidth: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  childBlock: {
    paddingTop: 0,
    backgroundColor: "#ebeef2",
  },

  flatList: {
    minWidth: "100%",
    alignItems: "center",
    gap: 20,
    paddingBottom: 10,
  },

  balance: {
    width: "97%",
    alignSelf: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(47, 71, 190, 0.591)",
    paddingVertical: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  balanceText: {
    lineHeight: 18,
    fontWeight: "700",
    color: "#fff",
    fontSize: 17,
  },

  balanceNum: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 17,
    marginTop: 5,
  },

  balanceHistory: {
    fontWeight: "400",
    color: "#fff",
    fontSize: 18,
    lineHeight: 20,
  },

  balanceInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#fff",
    height: 10,
    width: 10,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
  },
});
