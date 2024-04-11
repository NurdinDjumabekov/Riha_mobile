import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProductEveryInvoice } from "../store/reducers/requestSlice";
import { RenderResult } from "../components/RenderResult";
import { formatCount } from "../helpers/formatCount";

export const EveryInvoiceHistoryScreen = ({ route, navigation }) => {
  //// каждая загрузка(накладная) типо истории
  const { obj, title } = route.params;

  const dispatch = useDispatch();

  const { listProductEveryInvoiceTA } = useSelector(
    (state) => state.requestSlice
  );

  useEffect(() => {
    dispatch(getProductEveryInvoice(obj.guid)); //// guid накладной
    navigation.setOptions({ title });
  }, []);

  const totalSum = listProductEveryInvoiceTA?.reduce((total, item) => {
    return +item.price * +item.count + total;
  }, 0);

  return (
    <>
      {listProductEveryInvoiceTA?.length === 0 ? (
        <Text style={styles.noneData}>Данные отсутствуют</Text>
      ) : (
        <View>
          <FlatList
            contentContainerStyle={styles.flatList}
            data={listProductEveryInvoiceTA}
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
  flatList: {
    minWidth: "100%",
    width: "100%",
    paddingTop: 8,
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
