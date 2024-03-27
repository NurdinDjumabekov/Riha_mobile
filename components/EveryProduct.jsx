import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTemporaryData,
  clearDataInputsInv,
  removeListProductForTT,
} from "../store/reducers/stateSlice";
import { AddProductsTA } from "./TAComponents/AddProductsTA";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export const EveryProduct = ({ obj, index, type }) => {
  //// список продуктов для ТА
  /// (type)simpleList - обычный просмотр
  const dispatch = useDispatch();
  const [modalDel, setModalDel] = useState(false);
  const { temporaryData } = useSelector((state) => state.stateSlice);

  const addInTemporary = () => {
    dispatch(changeTemporaryData(obj));
    dispatch(clearDataInputsInv());
  };

  const deleteProd = () => {
    Vibration.vibrate([50, 100, 200]);
    setModalDel(true);
  };

  const isCheck = temporaryData?.guid === obj?.guid;
  return (
    <>
      {type ? (
        <TouchableOpacity style={styles.block} onLongPress={deleteProd}>
          <View style={styles.innerBlock}>
            {/* <Text style={styles.title}>{index + 1}. </Text> */}
            <Text style={styles.title}>{obj?.product_name}</Text>
          </View>
          <View style={styles.moreInfo}>
            <View style={styles.moreInfo__inner}>
              <Text style={styles.titleMore}>Вес (кол-во): </Text>
              <Text style={styles.titleMoreInner}>{obj?.ves}</Text>
            </View>
            <View style={styles.moreInfo__inner}>
              <Text style={styles.titleMore}>Цена: </Text>
              <Text style={styles.titleMoreInner}>{obj?.price} сом</Text>
            </View>
            <View style={styles.moreInfo__inner}>
              <Text style={styles.titleMore}>Сумма: </Text>
              <Text style={styles.titleMoreInner}>{obj?.price} сом</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={addInTemporary}
          style={[
            styles.block,
            isCheck ? styles.activeBlock : styles.blockMain,
          ]}
        >
          <View style={[styles.mainContent, isCheck && styles.more]}>
            <Text style={styles.title}>{index + 1}. </Text>
            <Text style={styles.title}>{obj?.product_name}</Text>
          </View>
          {/* {temporaryData?.guid === obj?.guid && (
          <TouchableOpacity style={styles.del} onPress={deleteTemporary}>
            <Text>x</Text>
          </TouchableOpacity>
        )} */}
          {Object.keys(temporaryData).length !== 0 &&
            temporaryData?.guid === obj?.guid && <AddProductsTA />}
        </TouchableOpacity>
      )}
      {/* /// для подтверждения удаления */}
      <ConfirmationModal
        visible={modalDel}
        message="Удалить ?"
        onYes={() => dispatch(removeListProductForTT(obj))}
        onNo={() => setModalDel(false)}
        onClose={() => setModalDel(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  blockMain: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  block: {
    backgroundColor: "#fff",
    minWidth: "100%",
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "rgb(217 223 232)",
  },
  innerBlock: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  mainContent: {
    display: "flex",
    flexDirection: "row",
  },
  moreInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  moreInfo__inner: {
    width: "34%",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
  },

  titleMore: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: "rgb(217 223 232)",
  },

  titleMoreInner: {
    fontSize: 13,
    fontWeight: "400",
    color: "#222",
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
  },

  activeBlock: {
    backgroundColor: "rgba(184, 196, 246, 0.99)",
    borderColor: "rgba(184, 196, 246, 0.99)",
  },

  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#222",
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
  more: {
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
  },
});
