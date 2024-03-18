import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeDataLogin, clearLogin } from "../store/reducers/stateSlice";
import { ViewInput } from "../customsTags/ViewInput";
import { ViewContainer } from "../customsTags/ViewContainer";
import { ViewButton } from "../customsTags/ViewButton";
import { logInAccount } from "../store/reducers/requestSlice";
import { useEffect, useState } from "react";
import { ViewImg } from "../customsTags/ViewImg";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { dataLogin } = useSelector((state) => state.stateSlice);
  const { preloader } = useSelector((state) => state.requestSlice);

  const onChangeLogin = (text) => {
    dispatch(changeDataLogin({ ...dataLogin, login: text }));
  };

  const onChangePassword = (text) => {
    dispatch(changeDataLogin({ ...dataLogin, password: text }));
  };

  const sendLogin = () => {
    dispatch(logInAccount({ dataLogin, navigation }));
    if (dataLogin?.login && dataLogin?.password) {
    } else {
      alert("Введите логин и пароль!");
    }
  };

  useEffect(() => {
    dispatch(clearLogin());
  }, []);
  const link = "https://riha.kg/wp-content/themes/h/redesign/images/logo.png";

  return (
    <ViewContainer>
      <View style={{ paddingBottom: 50 }}>
        <ViewImg
          url={link}
          stylesImg={{
            width: 200,
            height: 100,
            objectFit: "contain",
            marginBottom: 20,
          }}
          stylesDiv={{
            display: "flex",
            alignItems: "center",
          }}
        />
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
      <ViewButton
        onclick={sendLogin}
        styles={{
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 30,
          left: 10,
          right: 10,
          minWidth: "100%",
          elevation: 2,
        }}
      >
        Войти
      </ViewButton>
    </ViewContainer>
  );
};
