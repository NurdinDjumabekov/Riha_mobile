import React from "react";
import { TouchableOpacity } from "react-native";
import { ViewImg } from "../customsTags/ViewImg";

export const LogOut = () => {
  const imgLogOut =
    "https://www.kindpng.com/picc/m/19-194789_logout-button-png-transparent-png.png";

  const logOut = () => {

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
