import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLeftovers,
  getCategoryTA,
  getMyLeftovers,
} from "../store/reducers/requestSlice";
import { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { ViewButton } from "../customsTags/ViewButton";
import { ScrollView } from "react-native";

export const LeftoversScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { id, name } = route?.params;

  const { listCategoryTA, listLeftovers } = useSelector(
    (state) => state.requestSlice
  );

  const agent_guid = "b3120f36-3fcd-4ca0-8346-484881974846";

  useEffect(() => {
    getData();
    return () => dispatch(changeLeftovers([]));
  }, []);

  const getData = async () => {
    await dispatch(getCategoryTA(agent_guid));
    await dispatch(getMyLeftovers(agent_guid));
  };

  // console.log(listLeftovers, "listLeftovers");

  const select = {
    height: 50,
    width: 250,
    backgroundColor: "#fff",
    // borderWidth: 2,
    // borderColor: "rgb(217 223 232)",
    borderRadius: 6,
    // paddingLeft: 10,
    marginLeft: 5,
    marginBottom: 15,
    // fontSize: 13,
    paddingTop: 0,
  };

  const windowWidth = Dimensions.get("window").width;
  const arrWidth = [35, 19, 14, 14, 18]; //  проценты %
  const resultWidths = arrWidth.map(
    (percentage) => (percentage / 100) * windowWidth
  );

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const textStyles = {
    margin: 6,
    marginBottom: 8,
    marginTop: 8,
    fontSize: 12,
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <SafeAreaView>
          {/* <View style={styles.sortBlock}>
            <View style={select}>
              <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={listCategoryTA}
                // placeholder={{ label: "Все", value: 0 }}
                placeholder={{ label: "Все", value: null }}
                // style={{
                //   inputIOS: select,
                //   inputAndroid: select,
                // }}
                // useNativeAndroidPickerStyle={false}
              />
            </View>
            <ViewButton
              onclick={() => setShowDatePicker(true)}
              styles={styles.date}
            >
              Сортировать по дате
            </ViewButton>
          </View> */}
          {listLeftovers?.length === 0 ? (
            <Text style={styles.noneData}>Остатка нет...</Text>
          ) : (
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: "rgba(199, 210, 254, 0.718)",
                minWidth: "100%",
                textAlign: "center",
              }}
            >
              <Row
                data={[
                  "Товар",
                  "Остаток на начало",
                  "Приход",
                  "Расход",
                  "Остаток на конец",
                ]}
                style={styles.head}
                textStyle={{ margin: 3, fontSize: 13, fontWeight: 500 }}
                flexArr={resultWidths}
              />
              <TableWrapper style={{ flexDirection: "row" }}>
                {/* <Rows
                  data={listLeftovers}
                  textStyle={{
                    margin: 6,
                    marginBottom: 8,
                    marginTop: 8,
                    fontSize: 12,
                  }}
                  flexArr={resultWidths}
                /> */}
                <Rows
                  data={listLeftovers.map((item) => [
                    item[0], // Товар
                    item[1], // Остаток на начало
                    <Text style={[textStyles, { color: "green" }]}>
                      {item[2]}
                    </Text>, // Приход
                    <Text style={[textStyles, { color: "red" }]}>
                      {item[3]}
                    </Text>, // Расход
                    item[4], // Остаток на конец
                  ])}
                  textStyle={textStyles}
                  flexArr={resultWidths}
                />
              </TableWrapper>
            </Table>
          )}
        </SafeAreaView>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 10,
    paddingBottom: 30,
  },
  sortBlock: {
    display: "flex",
    flexDirection: "row",
  },
  date: {
    width: 200,
    backgroundColor: "red",
  },
  head: {
    height: 65,
    backgroundColor: "rgba(199, 210, 254, 0.250)",
  },
});
