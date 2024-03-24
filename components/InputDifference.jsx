import { View, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeAcceptInvoiceTA } from "../store/reducers/stateSlice";

export const InputDifference = ({ guidProduct, guidInvoice }) => {
  const { acceptConfirmInvoice } = useSelector((state) => state.stateSlice);
  const dispatch = useDispatch();

  const checkInput = (text) => {
    if (!text) {
      // Если текст пустой, удаляем объект из массива
      dispatch(
        changeAcceptInvoiceTA({
          ...acceptConfirmInvoice,
          products: acceptConfirmInvoice.products.filter(
            (item) => item.guid !== guidProduct
          ),
        })
      );
    } else {
      // Если текст не пустой, обновляем значение объекта
      dispatch(
        changeAcceptInvoiceTA({
          ...acceptConfirmInvoice,
          invoice_guid: guidInvoice,
          products: [
            ...acceptConfirmInvoice.products.filter(
              (item) => item.guid !== guidProduct
            ),
            { guid: guidProduct, is_checked: false, count: text },
          ],
        })
      );
    }
  };

  return (
    <View style={styles.standartBox}>
      <TextInput
        style={styles.input}
        value={
          acceptConfirmInvoice.products
            ?.filter((item) => item.guid === guidProduct)
            ?.map((item) => item.count)?.[0]
        }
        onChangeText={checkInput}
        keyboardType="numeric"
      />
      <View style={styles.standartBox__inner}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  standartBox: {
    position: "relative",
    width: 60,
    height: 30,
    borderWidth: 1,
    borderColor: "rgb(206 217 230)",
    borderRadius: 7,
    margin: 5,
    justifyContent: "center",
    paddingHorizontal: 5,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },
  standartBox__inner: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 3,
  },
});
