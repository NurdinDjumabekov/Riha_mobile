import { SafeAreaView, View } from "react-native";
import styled from "styled-components/native";

const Div = styled.View`
  width: 100%;
  margin: 0 auto;
  padding: 0 5px;
  background: red;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ViewContainer = ({ children }) => {
  return (
    <SafeAreaView>
      <Div>{children}</Div>
    </SafeAreaView>
  );
};
