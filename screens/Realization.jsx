import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ViewContainer } from "../customsTags/ViewContainer";
export const Realization = () => {
  const [listSelect, setListSeelct] = useState([
    { label: "Колбаса", value: "Колбаса" },
    { label: "Сосиски", value: "Сосиски" },
    { label: "Фрикадельки", value: "Фрикадельки" },
    { label: "диетическая колбаса", value: "диетическая колбаса" },
  ]);

  return (
    <ViewContainer>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.titleSelect}>Выберите категорию</Text>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={listSelect}
            placeholder={{ label: "Выбрать категорию", value: null }}
            style={{
              inputIOS: styles.inputIOS, // для iOS
              inputAndroid: styles.inputAndroid, // для Android
            }}
          />
          <View>
            <Text style={styles.titleSelect}>Выберите товар</Text>
            <Text>Выберите категорию</Text>
          </View>
        </View>
      </SafeAreaView>
    </ViewContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    minWidth: "100%",
  },

  titleSelect: {
    textAlign: "left",
    width: "100%",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  inputIOS: {
    // backgroundColor: "rgba(199, 210, 254, 0.918)",
    borderColor: "rgba(199, 210, 254, 0.718)",
    borderWidth: 1,
  },
  inputAndroid: {
    // backgroundColor: "rgba(199, 210, 254, 0.918)",
    borderWidth: 1,
    borderColor: "rgba(199, 210, 254, 0.718)",
  },
});
