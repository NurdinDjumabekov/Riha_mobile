import { useEffect } from "react";
import { RefreshControl, StyleSheet, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAcceptInvoice } from "../../../store/reducers/requestSlice";
import { EveryMyInvoice } from "../../EveryMyInvoice";

export const AcceptInvoiceHistory = ({ navigation }) => {
  const dispatch = useDispatch();

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  const { preloader, listAcceptInvoice } = useSelector(
    (state) => state.requestSlice
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => dispatch(getAcceptInvoice(agent_guid));

  //   console.log(listAcceptInvoice, "listAcceptInvoice");

  return (
    <View style={styles.blockList}>
      <FlatList
        contentContainerStyle={styles.flatListStyle}
        data={listAcceptInvoice}
        renderItem={({ item }) => (
          <EveryMyInvoice obj={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.codeid}
        refreshControl={
          <RefreshControl refreshing={preloader} onRefresh={getData} />
        }
      />
    </View>
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
