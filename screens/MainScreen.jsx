import { Text, View, Image, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";

const Post = styled.View`
  font-size: 20px;
  width: 100%;
  height: 350px;
  background-color: red;
  border-radius: 10px;
  margin: 80px auto;
  
`;
const PostImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin: auto;
`;

export const MainScreen = () => {
  //   const { start } = useSelector((state) => state.stateSlice);

  return (
    <SafeAreaView>
      <Text>start</Text>
      <Post>
        <PostImage
          source={{
            uri: "https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1710518400&semt=ais",
          }}
        />
      </Post>
    </SafeAreaView>
  );
};
