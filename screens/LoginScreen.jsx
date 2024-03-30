import { View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeDataLogin, clearLogin } from "../store/reducers/stateSlice";
import { changeToken } from "../store/reducers/saveDataSlice";
import { ViewInput } from "../customsTags/ViewInput";
import { ViewContainer } from "../customsTags/ViewContainer";
import { ViewButton } from "../customsTags/ViewButton";
import { logInAccount } from "../store/reducers/requestSlice";
import { useEffect } from "react";
import logo from "../assets/images/logo.png";
import { StyleSheet } from "react-native";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { dataLogin } = useSelector((state) => state.stateSlice);
  const { preloader } = useSelector((state) => state.requestSlice);
  const { token } = useSelector((state) => state.saveDataSlice);
  // console.log(token, "tokenl");

  const onChangeLogin = (text) => {
    dispatch(changeDataLogin({ ...dataLogin, login: text }));
  };

  const onChangePassword = (text) => {
    dispatch(changeDataLogin({ ...dataLogin, password: text }));
  };

  const sendLogin = async () => {
    if (dataLogin?.login && dataLogin?.password) {
      dispatch(logInAccount({ dataLogin, navigation }));
      // dispatch(changeToken(dataLogin?.login));
      // navigation.navigate("Main");
    } else {
      alert("Введите логин и пароль!");
    }
  };

  useEffect(() => {
    // dispatch(clearLogin());
    //     dispatch(changeToken(""));
  }, []);

  return (
    <View
      styles={{
        position: "relative",
      }}
    >
      <ViewContainer>
        <View>
          <View style={styles.logoBlock}>
            <Image source={logo} style={{ width: 200, height: 65 }} />
          </View>
          <ViewInput
            text="Введите логин"
            value={dataLogin.login}
            onChangeText={onChangeLogin}
            placeholder="Ваш логин"
          />
          <ViewInput
            text="Введите пароль"
            value={dataLogin.password}
            onChangeText={onChangePassword}
            placeholder="Ваш пароль"
            // onSubmitEditing={sendLogin}
          />
        </View>
      </ViewContainer>
      <ViewButton onclick={sendLogin} styles={styles.btnLogin}>
        Войти
      </ViewButton>
    </View>
  );
};
const styles = StyleSheet.create({
  logoBlock: {
    // minWidth: 400,
    height: 120,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },

  btnLogin: {
    backgroundColor: "rgba(47, 71, 190, 0.591))",
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
    minWidth: "90%",
    color: "#fff",
    marginTop: 0,
  },
});
