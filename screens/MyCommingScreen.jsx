import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellersPoint } from "../store/reducers/requestSlice";
import { useEffect, useState } from "react";
import { ViewButton } from "../customsTags/ViewButton";
import message from "../assets/icons/sendMessage.jpg";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native";
import ConfirmationModal from "../components/ConfirmationModal";

export const MyCommingScreen = ({ navigation, route }) => {
  const { listSellersPoints } = useSelector((state) => state.requestSlice);
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    dispatch(getAllSellersPoint("a8908e83-2ee6-4627-a7f2-9a46e2de08cf")); /// guid агента
  }, []);

  const createApplication = () => {
    console.log("asdasdas");
  };

  console.log(listSellersPoints, "listSellersPoints");
  return (
    <>
      <ScrollView style={styles.parentBlock}>
        <SafeAreaView>
          <ViewButton
            styles={styles.sendBtn}
            onclick={() => setModalState(true)}
          >
            <Image style={styles.imgIcon} source={message} />
            Создать накладную
          </ViewButton>
          <ViewButton styles={styles.sendBtn}>
            <Image style={styles.imgIcon} source={message} />
            Посмотреть мои накладные
          </ViewButton>
        </SafeAreaView>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalState}
        onRequestClose={() => setModalState(false)}
      >
        <TouchableOpacity
          style={styles.modalOuter}
          activeOpacity={1}
          onPress={() => setModalState(false)} // Закрыть модальное окно
        >
          <View style={styles.modalInner} onPress={() => setModalState(true)}>
            <Text style={styles.titleSelect}>Выберите филиал</Text>
            <RNPickerSelect
              onValueChange={(guid) => console.log(guid)}
              items={listSellersPoints}
              placeholder={{ label: "Выбрать филиал", value: null }}
              style={{
                inputIOS: styles.selectBlock,
                inputAndroid: styles.selectBlock,
                iconContainer: styles.selectBlock,
              }}
            />
            {/* <View>
              <Text style={styles.titleSelect}>Выберите товар</Text>
              <Text>Выберите категорию</Text>
            </View> */}
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  parentBlock: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ebeef2",
  },
  parentBlock: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 10,
    backgroundColor: "#ebeef2",
  },
  sendBtn: {
    backgroundColor: "#fff",
    color: "rgba(97 ,100, 239,0.7)",
    minWidth: "100%",
    paddingTop: 0,
    borderRadius: 10,
    fontWeight: 600,
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    marginTop: 10,
  },
  imgIcon: {
    width: 35,
    height: 35,
  },
  selectBlock: {
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    backgroundColor: "#ebeef2",
    marginTop: 15,
  },
});
