import { TextInput, View } from "react-native";

import styled from "styled-components/native";

export const ViewInput = ({ value, onChangeText, placeholder }) => {
  const ViewTextInput = styled.TextInput`
    min-width: 100%;
    height: 50px;
    border-radius: 10px;
    margin: 10px auto;
    background-color: #f5f5f0;
    padding: 0 12px;
    font-size: 18px;
    shadow-color: "#222";
  `;

  return (
    <View>
      <ViewTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};
