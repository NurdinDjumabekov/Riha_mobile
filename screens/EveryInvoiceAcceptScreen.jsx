import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAcceptProdInvoice } from "../store/reducers/requestSlice";
import { FlatList } from "react-native";

export const EveryInvoiceAcceptScreen = ({ route, navigation }) => {
  //// каждый возврат накладной типо истории
  const dispatch = useDispatch();
  const { codeid, guid } = route.params;

  const { listAcceptInvoiceProd } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    navigation.setOptions({
      title: `Накладная №${codeid}`,
    });
    dispatch(getAcceptProdInvoice(guid));
  }, []);

  console.log(listAcceptInvoiceProd, "listAcceptInvoiceProd");

  const totalSum = listAcceptInvoiceProd?.reduce((total, item) => {
    return +item.price * +item.count + total;
  }, 0);

  return (
    <>
      {listAcceptInvoiceProd?.length === 0 ? (
        <Text style={styles.noneData}>Данные отсутствуют</Text>
      ) : (
        <View style={styles.parentDataModal}>
          <FlatList
            contentContainerStyle={styles.flatList}
            data={listAcceptInvoiceProd}
            renderItem={({ item }) => (
              <View style={styles.everyProd}>
                <Text style={styles.titleHistory}>{item.product_name}</Text>
                <View style={styles.everyProdInner}>
                  <Text style={styles.koll}>Кол-во (вес): {item.count}</Text>
                  <Text style={styles.priceHistory}>{item.price} сом</Text>
                  <Text style={styles.summ}>
                    Сумма: {+item.price * +item.count}сом
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.codeid}
          />
          <Text style={styles.result}>Итого: {totalSum} сом </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  comments: {
    maxWidth: 230,
    fontSize: 12,
  },

  flatList: { minWidth: "100%", width: "100%", paddingTop: 8 },

  everyProd: {
    // backgroundColor: "red",
    padding: 10,
    paddingRight: 10,
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
    // backgroundColor:'red',
    width: "33%",
  },

  titleHistory: {
    color: "#222",
    fontSize: 13,
    fontWeight: "500",
    width: "65%",
  },

  priceHistory: {
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

  noneData: {
    flex: 1,
    paddingTop: 300,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
});
