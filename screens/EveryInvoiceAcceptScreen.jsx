import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAcceptProdInvoice } from "../store/reducers/requestSlice";
import { FlatList } from "react-native";
import { RenderResult } from "../components/RenderResult";
import { formatCount } from "../helpers/formatCount";

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

  // console.log(listAcceptInvoiceProd, "listAcceptInvoiceProd");

  const totalSum = listAcceptInvoiceProd?.reduce((total, item) => {
    return +item.price * +item.count_usushka + total;
  }, 0);

  return (
    <>
      {listAcceptInvoiceProd?.length === 0 ? (
        <Text style={styles.noneData}>Данные отсутствуют</Text>
      ) : (
        <View>
          <FlatList
            contentContainerStyle={styles.flatList}
            data={listAcceptInvoiceProd}
            renderItem={({ item, index }) => (
              <RenderResult item={item} index={index} />
            )}
            keyExtractor={(item) => item.codeid}
          />
          <Text style={styles.result}>Итого: {formatCount(totalSum)} сом </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatList: { minWidth: "100%", width: "100%", paddingTop: 8 },

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
