import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellersPoint } from "../store/reducers/requestSlice";
import { ViewButton } from "../customsTags/ViewButton";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";

export const ReturnScreen = () => {
  //// возрат товара
  const dispatch = useDispatch();

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  const { listSellersPoints } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    // dispatch(getAllSellersPoint(agent_guid));
  }, []);

  const createInvoice = () => {};
  console.log(listSellersPoints, "listSellersPoints");

  const FlatListStyle = {
    minWidth: "100%",
    width: "100%",
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.587)",
  };
  return (
    <ScrollView>
      <View style={styles.returnBlock}>
        <ViewButton styles={styles.return} onclick={createInvoice}>
          + Создать накладную
        </ViewButton>
      </View>
      <View style={styles.blockList}>
        <FlatList
          contentContainerStyle={FlatListStyle}
          data={[]}
          renderItem={({ item }) => (
            <EveryInvoiceTA obj={item} navigation={navigation} />
          )}
          // keyExtractor={(item) => item.codeid}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={preloader}
          //     onRefresh={() => getData()}
          //   />
          // }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  returnBlock: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "100%",
  },

  return: {
    fontSize: 18,
    color: "#fff",
    minWidth: "95%",
    paddingTop: 10,
    borderRadius: 10,
    fontWeight: 600,
    backgroundColor: "rgba(97 ,100, 239,0.7)",
    marginTop: 10,
    marginBottom: 20,
  },

  blockList: {
    flex: 1,
    backgroundColor: "red",
  },
});
