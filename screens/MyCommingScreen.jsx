import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  View,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  createInvoiceTA,
  getAllSellersPoint,
} from "../store/reducers/requestSlice";
import { useEffect, useState } from "react";
import { ViewButton } from "../customsTags/ViewButton";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native";
import {
  changeEveryInvoiceTA,
  clearEveryInvoiceTA,
} from "../store/reducers/stateSlice";
import { EveryMyInvoice } from "../components/EveryMyInvoice";

export const MyCommingScreen = ({ navigation }) => {
  const { listSellersPoints } = useSelector((state) => state.requestSlice);
  const { createEveryInvoiceTA } = useSelector((state) => state.stateSlice);
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    dispatch(getAllSellersPoint("b3120f36-3fcd-4ca0-8346-484881974846")); /// guid агента
  }, []);

  const changeSelect = (guid) => {
    dispatch(
      changeEveryInvoiceTA({
        ...createEveryInvoiceTA,
        seller_guid: guid,
      })
    );
  };

  const changeComm = (text) => {
    dispatch(
      changeEveryInvoiceTA({
        ...createEveryInvoiceTA,
        comment: text,
      })
    );
  };

  const closeModal = () => {
    setModalState(false);
    dispatch(clearEveryInvoiceTA());
  };

  const createAppInvoiceTA = () => {
    if (createEveryInvoiceTA?.seller_guid === "") {
      Alert.alert("Выберите торговую точку!");
    } else {
      dispatch(createInvoiceTA({ data: createEveryInvoiceTA, navigation }));
    }
  };

  const list = [];

  return (
    <>
      <ScrollView style={styles.parentBlock}>
        <SafeAreaView>
          <ViewButton
            styles={styles.sendBtn}
            onclick={() => setModalState(true)}
          >
            + Создать накладную
          </ViewButton>
          {list?.length === 0 ? (
            <Text style={styles.noneData}>Список накладных пустой</Text>
          ) : (
            <FlatList
              contentContainerStyle={{
                minWidth: "100%",
                width: "100%",
              }}
              data={list}
              renderItem={({ item }) => (
                <EveryMyInvoice obj={item} navigation={navigation} />
              )}
              // keyExtractor={(item) => item.codeid}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={preloader}
              //     onRefresh={() => dispatch(getMyInvoice({ obj: route?.params }))}
              //   />
              // }
            />
          )}
        </SafeAreaView>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalState}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOuter}
          activeOpacity={1}
          onPress={closeModal} // Закрыть модальное окно
        >
          <View style={styles.modalInner} onPress={() => setModalState(true)}>
            <Text style={styles.titleSelect}>Выберите торговую точку</Text>
            <View style={styles.selectBlock}>
              <RNPickerSelect
                onValueChange={changeSelect}
                items={listSellersPoints}
                placeholder={{ label: "Выбрать торговую точку", value: null }}
              />
            </View>
            <TextInput
              style={styles.inputComm}
              value={createEveryInvoiceTA.comment}
              onChangeText={changeComm}
              placeholder="Ваш комментарий"
              multiline={true} // Многострочное поле для комментариев
              numberOfLines={4} // Опционально: количество отображаемых строк
            />
            <ViewButton
              styles={{ ...styles.sendBtn, ...styles.actionSendBtn }}
              onclick={createAppInvoiceTA}
            >
              Создать накладную
            </ViewButton>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  parentBlock: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 10,
    backgroundColor: "#ebeef2",
  },

  modalOuter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  noneData: {
    flex: 1,
    height: 500,
    paddingTop: 250,
    textAlign: "center",
    fontSize: 20,
  },

  modalInner: {
    backgroundColor: "#ebeef2",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },

  titleSelect: {
    fontSize: 17,
    fontWeight: "500",
  },

  sendBtn: {
    backgroundColor: "#fff",
    color: "rgba(97 ,100, 239,0.7)",
    minWidth: "100%",
    paddingTop: 10,
    borderRadius: 10,
    fontWeight: 600,
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    marginTop: 10,
  },
  actionSendBtn: {
    paddingTop: 12,
    fontSize: 18,
    // backgroundColor: "rgba(95, 230, 165, 0.99)",
    backgroundColor: "rgba(97 ,100, 239,0.7)",
    color: "#fff",
  },
  imgIcon: {
    width: 35,
    height: 35,
  },
  selectBlock: {
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  inputComm: {
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    height: 60,
    borderRadius: 8,
    padding: 10,
    paddingLeft: 15,
    marginTop: 10,
    height: 120,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
});

// parentBlock: {
//   flex: 1,
//   paddingLeft: 0,
//   paddingRight: 0,
//   // padding: 10,
//   backgroundColor: "#ebeef2",
// },

// everyBlock: {
//   backgroundColor: "red",
//   padding: 10,
//   paddingBottom: 15,
//   paddingTop: 15,
//   backgroundColor: "rgba(162, 178, 238, 0.102)",

//   borderBottomWidth: 1,
//   borderColor: "rgba(47, 71, 190, 0.287)",
// },

// sendBtn: {
//   // backgroundColor: "#fff",
//   color: "rgba(97 ,100, 239,0.7)",
//   minWidth: "100%",
//   paddingTop: 0,
//   borderRadius: 10,
//   fontWeight: "600",
//   // marginTop: 10,
// },
