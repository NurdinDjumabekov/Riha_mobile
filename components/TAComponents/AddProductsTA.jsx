import { Alert, StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ViewButton } from "../../customsTags/ViewButton";
import { changeDataInputsInv } from "../../store/reducers/stateSlice";
import {
  changePreloader,
  checkProductLeftovers,
} from "../../store/reducers/requestSlice";

export const AddProductsTA = ({ productGuid }) => {
  //// для добавления продуктов в список
  const dispatch = useDispatch();

  const { dataInputsInv, temporaryData } = useSelector(
    (state) => state.stateSlice
  );

  const addInInvoice = () => {
    if (
      dataInputsInv.price === "" ||
      dataInputsInv.ves === "" ||
      dataInputsInv.price == 0 ||
      dataInputsInv.ves == 0
    ) {
      Alert.alert("Введите цену и вес!");
    } else {
      const data = { ...temporaryData, ...dataInputsInv, productGuid };
      dispatch(checkProductLeftovers(data));
      console.log(data,"data");
      dispatch(changePreloader(true));
    }
  };

  // console.log(dataInputsInv, "dataInputsInv");
  return (
    <View style={styles.addDataBlock}>
      <TextInput
        style={styles.input}
        value={dataInputsInv?.price?.toString()}
        onChangeText={(text) =>
          dispatch(changeDataInputsInv({ ...dataInputsInv, price: text }))
        }
        keyboardType="numeric"
        placeholder="Цена"
      />
      <TextInput
        style={styles.input}
        value={dataInputsInv.ves}
        onChangeText={(text) =>
          dispatch(changeDataInputsInv({ ...dataInputsInv, ves: text }))
        }
        keyboardType="numeric"
        placeholder="Вес"
      />
      <ViewButton styles={styles.btnAdd} onclick={addInInvoice}>
        Добавить
      </ViewButton>
    </View>
  );
};

const styles = StyleSheet.create({
  addDataBlock: {
    minWidth: "100%",
    backgroundColor: "rgba(184, 196, 246, 0.99)",
    // position: "absolute",
    // bottom: 5,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    paddingTop: 15,
    paddingBottom: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  input: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    width: "33%",
    borderRadius: 5,
  },
  btnAdd: {
    backgroundColor: "rgba(95, 230, 165, 0.99)",
    color: "#fff",
    minWidth: "28%",
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 5,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    fontSize: 16,
    marginTop: 0,
  },
});
