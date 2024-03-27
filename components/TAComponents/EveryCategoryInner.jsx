import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProductTA } from "../../store/reducers/requestSlice";
import { changeStateForCategory } from "../../store/reducers/stateSlice";

export const EveryCategoryInner = ({ obj, index }) => {
  //// список категорий(для сортироваки данных ТА)
  const dispatch = useDispatch();

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  const { stateForCategory } = useSelector((state) => state.stateSlice);

  const changeSelect = () => {
    dispatch(getProductTA({ guid: obj?.value, agent_guid }));
    dispatch(changeStateForCategory(obj?.value));
  };

  console.log(obj, "obj");

  const isTrue = stateForCategory === obj?.value;

  return (
    <>
      <TouchableOpacity
        style={[styles.container, isTrue && styles.activeCateg]}
        onPress={changeSelect}
      >
        <Text style={[styles.titleNum, isTrue && { color: "#fff" }]}>
          {index}
          {obj.label}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(162, 178, 238, 0.102)",
    minWidth: "100%",
    padding: 8,
    paddingBottom: 3,
    paddingTop: 3,
    borderBottomWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.287)",
  },

  titleNum: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.672)",
  },

  activeCateg: {
    backgroundColor: "rgba(47, 71, 190, 0.672)",
    color: "#fff",
  },
});
