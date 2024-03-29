import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProductEveryInvoice } from "../store/reducers/requestSlice";

export const EveryInvoiceHistoryScreen = ({ route, navigation }) => {
  //// каждая загрузка(накладная) типо истории
  const { obj, title } = route.params;

  const dispatch = useDispatch();

  const { listProductEveryInvoiceTA } = useSelector(
    (state) => state.requestSlice
  );

  useEffect(() => {
    dispatch(getProductEveryInvoice(obj.guid));
    navigation.setOptions({
      title,
    });
  }, []);

  const totalProductPrice = listProductEveryInvoiceTA.reduce((total, item) => {
    return total + item.product_price;
  }, 0);

  // console.log(listInvoiceEveryTA, "listInvoiceEveryTA");
  console.log(listProductEveryInvoiceTA, "listProductEveryInvoiceTA");
  // console.log(obj, "obj");
  // console.log(route, "route");

  return (
    <>
      <View style={styles.parentDataModal}>
        <FlatList
          contentContainerStyle={{
            minWidth: "100%",
            width: "100%",
          }}
          data={listProductEveryInvoiceTA}
          renderItem={({ item }) => (
            <View style={styles.everyProd}>
              <Text style={styles.titleHistory}>{item.product_name}</Text>
              <View style={styles.everyProdInner}>
                <Text style={styles.koll}>Кол-во (вес): {item.count}</Text>
                {/* <Text style={styles.koll}>Кол-во (вес): {item.change}</Text> */}
                <Text style={styles.titleHistory}>
                  {item.product_price} сом
                </Text>
                <Text style={styles.summ}>
                  Сумма: {+item.product_price * +item.count}сом
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.codeid}
          //   refreshControl={
          //     <RefreshControl
          //       refreshing={preloader}
          //       onRefresh={() => getData()}
          //     />
          //   }
        />
        <Text style={styles.result}>Итого: {totalProductPrice} сом </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  comments: {
    maxWidth: 230,
    fontSize: 12,
  },

  ///// modal //////
  everyProd: {
    // backgroundColor: "red",
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(162, 178, 238, 0.439)",
    backgroundColor: "rgba(162, 178, 238, 0.102)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  everyProdInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleHistory: {
    color: "#222",
    fontSize: 13,
    fontWeight: "500",
    width: "70%",
  },
  koll: {
    color: "rgba(12, 169, 70, 0.486)",
  },
  summ: {
    color: "rgba(47, 71, 190, 0.887)",
  },

  result: {
    color: "#222",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "right",
    padding: 10,
  },
});
