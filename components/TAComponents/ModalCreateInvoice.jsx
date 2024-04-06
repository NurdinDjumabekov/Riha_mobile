import {
  StyleSheet,
  Modal,
  Text,
  View,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  changeEveryInvoiceTA,
  changeTemporaryData,
  clearDataInputsInv,
  clearEveryInvoiceTA,
} from "../../store/reducers/stateSlice";
import { createInvoiceTA } from "../../store/reducers/requestSlice";
import { ViewButton } from "../../customsTags/ViewButton";

export const ModalCreateInvoice = ({
  modalState,
  setModalState,
  navigation,
}) => {
  const { listSellersPoints } = useSelector((state) => state.requestSlice);
  const { createEveryInvoiceTA } = useSelector((state) => state.stateSlice);
  const dispatch = useDispatch();

  const agent_guid = "b3120f36-3fcd-4ca0-8346-484881974846";

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
    dispatch(clearEveryInvoiceTA()); /// очистка выбора временного состояния для отправки
  };

  const createAppInvoiceTA = () => {
    if (createEveryInvoiceTA?.seller_guid === "") {
      Alert.alert("Выберите торговую точку!");
    } else {
      dispatch(createInvoiceTA({ data: createEveryInvoiceTA, navigation }));
      dispatch(clearEveryInvoiceTA());
      dispatch(clearDataInputsInv());
      dispatch(changeTemporaryData({}));
      setModalState(false);
    }
  };

  const widthMax = { minWidth: "100%", width: "100%" };

  return (
    <>
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
              <FlatList
                contentContainerStyle={widthMax}
                data={listSellersPoints}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.selectBlockInner,
                      createEveryInvoiceTA?.seller_guid === item?.value &&
                        styles.activeSelect,
                    ]}
                    onPress={() => changeSelect(item?.value)}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        createEveryInvoiceTA?.seller_guid === item?.value &&
                          styles.activeSelectText,
                      ]}
                    >
                      {item?.label}
                    </Text>
                  </TouchableOpacity>
                )}
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
  modalOuter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalInner: {
    backgroundColor: "#ebeef2",
    padding: 15,
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
    backgroundColor: "rgba(97 ,100, 239,0.7)",
    color: "#fff",
  },

  selectBlock: {
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    minHeight: 70,
    maxHeight: 250,
  },

  selectBlockInner: {
    minWidth: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    backgroundColor: "#fff",
    borderRadius: 3,
  },

  activeSelect: {
    backgroundColor: "rgba(47, 71, 190, 0.672)",
  },

  selectText: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.672)",
  },

  activeSelectText: {
    color: "#fff",
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
