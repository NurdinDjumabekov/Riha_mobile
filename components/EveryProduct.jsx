import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeTemporaryData } from "../store/reducers/stateSlice";

export const EveryProduct = ({ obj, index }) => {
  //// список продуктов для ТА
  const dispatch = useDispatch();

  const { temporaryData } = useSelector((state) => state.stateSlice);

  const addInTemporary = () => {
    dispatch(changeTemporaryData(obj));
  };

  const deleteTemporary = () => {
    dispatch(changeTemporaryData({}));
  };

  return (
    <TouchableOpacity onPress={addInTemporary}>
      <View
        style={[
          styles.block,
          temporaryData?.guid === obj?.guid && styles.activeBlock,
        ]}
      >
        <Text style={styles.title}>{index + 1}. </Text>
        <Text style={styles.title}>{obj?.product_name}</Text>
      </View>
      {temporaryData?.guid === obj?.guid && (
        <TouchableOpacity style={styles.del} onPress={deleteTemporary}>
          <Text>x</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: "#fff",
    minWidth: "100%",
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "rgb(217 223 232)",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    paddingLeft: 15,
  },

  activeBlock: {
    backgroundColor: "rgba(184, 196, 246, 0.99)",
    borderColor: "rgba(184, 196, 246, 0.99)",
  },

  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#222",
    borderRadius: 4,
    // paddingLeft: 5,
  },

  del: {
    position: "absolute",
    right: 2,
    top: 6,
    backgroundColor: "red",
    textAlign: "center",
    padding: 10,
    paddingTop: 3,
    paddingBottom: 6,
    lineHeight: 10,
    borderRadius: 20,
  },
});
