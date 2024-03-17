import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";

const ParentDiv = styled.TouchableOpacity`
  min-width: 100%;
  height: 180px;
  border-radius: 8px;
  position: relative;
  background-color: #fff;
`;
//   padding: 5px 10px;

// shadow-color: #000;
// shadow-offset: {width: 0, height: 4};
// shadow-opacity: 0.1;
// shadow-radius: 6px;
// elevation: 2;

const TextTitle = styled.Text`
  margin: 0;
  padding: 0;
  font-size: 25px;
  font-weight: 600;
  padding: 5px 10px;
`;

const BackgroundImage = styled.Image`
  display: block;
  width: 100%;
  height: 180px;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 8px;
`;

// font-size: 20px;
//   width: 100%;
//   height: 350px;
//   background-color: red;
//   border-radius: 10px;
//   margin: 80px auto;

export const EveryCategory = ({ obj, navigation }) => {
  const clickCateg = () => {
    // console.log(navigation, "navigation");
    // console.log(obj.link);
    navigation.navigate(`${obj.link}`, {
      id: obj?.codeid,
      name: obj?.name,
      pathApi: obj?.pathApi,
    });
  };

  return (
    <ParentDiv onPress={clickCateg}>
      <BackgroundImage source={{ uri: obj.img }} />
      <TextTitle>{obj?.name}</TextTitle>
    </ParentDiv>
  );
};
