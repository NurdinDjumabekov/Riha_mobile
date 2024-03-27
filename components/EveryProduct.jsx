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
      {type ? ( //// для списка продкетов , которые отправятся к ТТ
        <TouchableOpacity style={styles.blockProducts} onLongPress={deleteProd}>
          <View style={styles.innerBlock}>
            <Text style={styles.title}>{index + 1}. </Text>
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
              <Text style={styles.titleMoreInner}>
                {+obj?.ves * +obj?.price} сом
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={addInTemporary}
          style={[
            styles.block,
            styles.blockMain,
            isCheck && styles.activeBlock,
          ]}
        >
          <View style={styles.blockMainInner}>
            <View style={styles.mainContent}>
              <Text style={[styles.title, isCheck && styles.activeTitle]}>
                {index + 1}.{" "}
              </Text>
              <Text
                style={[
                  styles.title,
                  isCheck && styles.activeTitle,
                  {
                    width: "85%",
                  },
                ]}
              >
                {obj?.product_name}
              </Text>
            </View>
            {!isCheck && <View style={styles.arrow}></View>}
          </View>
          {Object.keys(temporaryData).length !== 0 && isCheck && (
            <AddProductsTA />
          )}
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
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgba(162, 178, 238, 0.102)",
  },

  blockMainInner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "99%",
  },
  block: {
    backgroundColor: "#fff",
    minWidth: "100%",
    // marginBottom: 10,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: "rgb(217 223 232)",
  },

  blockProducts: {
    backgroundColor: "#fff",
    minWidth: "100%",
    marginBottom: 10,
    // borderRadius: 5,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: "rgba(47, 71, 190, 0.287)",
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
    display: "flex",
    flexDirection: "column",
  },

  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#222",
  },

  activeTitle: {
    color: "#fff",
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "rgba(162, 178, 238, 0.439)",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
    marginTop: 5,
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
