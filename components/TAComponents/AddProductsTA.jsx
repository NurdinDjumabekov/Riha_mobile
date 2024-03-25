import { StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ViewButton } from "../../customsTags/ViewButton";

export const AddProductsTA = ({ obj, index }) => {
  //// для добавления продуктов в список
  const dispatch = useDispatch();

  const { temporaryData } = useSelector((state) => state.stateSlice);

  return (
    <View style={styles.addDataBlock}>
      <TextInput
        style={styles.input}
        // value={                // }
        // onChangeText={checkInput}
        keyboardType="numeric"
        placeholder="Цена"
      />
      <TextInput
        style={styles.input}
        // value={    // }
        // onChangeText={checkInput}
        keyboardType="numeric"
        placeholder="Вес"
      />
      <ViewButton styles={styles.btnAdd}>Добавить</ViewButton>
    </View>
  );
};

const styles = StyleSheet.create({
  addDataBlock: {
    minWidth: "100%",
    backgroundColor: "rgba(184, 196, 246, 0.99)",
    position: "absolute",
    bottom: 5,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    paddingTop: 25,
    paddingBottom: 25,
    borderRadius: 5,
  },
  input: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    width: "33%",
    borderRadius: 10,
  },
  btnAdd: {
    backgroundColor: "rgba(95, 230, 165, 0.99)",
    color: "#fff",
    minWidth: "28%",
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    fontSize: 18,
    marginTop: 0,
  },
});
