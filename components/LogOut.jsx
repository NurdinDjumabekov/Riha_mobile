import { TouchableOpacity } from "react-native";
import { ViewImg } from "../customsTags/ViewImg";
import { useDispatch } from "react-redux";
import { changePreloader } from "../store/reducers/requestSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeToken } from "../store/reducers/saveDataSlice";

export const LogOut = ({ navigation }) => {
  const dispatch = useDispatch();
  const imgLogOut =
    "https://www.kindpng.com/picc/m/19-194789_logout-button-png-transparent-png.png";

  const logOut = () => {
    dispatch(changePreloader(true));
    setTimeout(() => {
      dispatch(changeToken(""));
      navigation.navigate("Login");
      dispatch(changePreloader(false));
    }, 500);
  };

  return (
    <TouchableOpacity onPress={logOut}>
      <ViewImg
        url={imgLogOut}
        stylesImg={{
          width: 42,
          height: 40,
          objectFit: "contain",
          borderRadius: 20,
        }}
        stylesDiv={{
          // display: "flex",
          // alignItems: "center",
          minWidth: 40,
          width: 42,
          height: 40,
          backgroundColor: "#f2f2f2",
          borderRadius: 20,
        }}
      />
    </TouchableOpacity>
  );
};
