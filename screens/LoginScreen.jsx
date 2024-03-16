import { Button, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeDataLogin } from "../store/reducers/stateSlice";
import { ViewInput } from "../customsTags/ViewInput";
import { ViewContainer } from "../customsTags/ViewContainer";
import { ViewButton } from "../customsTags/ViewButton";
import { logInAccount } from "../store/reducers/requestSlice";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { dataLogin } = useSelector((state) => state.stateSlice);

  const onChangeLogin = (text) => {
    dispatch(changeDataLogin({ ...dataLogin, login: text }));
  };

  const onChangePassword = (text) => {
    dispatch(changeDataLogin({ ...dataLogin, password: text }));
  };

  const sendLogin = () => {
    // console.log(dataLogin);
    dispatch(logInAccount(dataLogin));
  };

  return (
    <ViewContainer>
      <View>
        <ViewInput
          value={dataLogin.login}
          onChangeText={onChangeLogin}
          placeholder="Введите логин"
        />
        <ViewInput
          value={dataLogin.password}
          onChangeText={onChangePassword}
          placeholder="Введите пароль"
        />
        <ViewButton onclick={sendLogin} color="green">
          Вход
        </ViewButton>
      </View>
    </ViewContainer>
  );
};
