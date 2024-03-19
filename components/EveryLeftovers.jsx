import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import styled from "styled-components/native";

const TextTitle = styled.Text`
  font-size: 17px;
  font-weight: 500;
  display: inline;
  padding: 10px 0 15px 5px;
  color: #383838;
`;

export const EveryLeftovers = ({ obj }) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const tableDataList = obj?.list?.map((item, index) => {
      return [
        `${item.name}`,
        item.kol.toString(),
        `${item.leftoversPrice.toString()} сом`,
        `${item.leftoversSum.toString()} сом`,
      ];
    });
    setListData(tableDataList);
  }, []); //// ${index + 1}.

  console.log(listData, "listData");

  //   console.log(obj, "obj");

  const arrWidth = [1, 0.8, 0.8, 1];

  return (
    <>
      <View style={styles.container}>
        <TextTitle>Дата: {obj?.date}</TextTitle>

        {listData?.length === 0 ? (
          <Text style={styles.noneData}>Остатка нет...</Text>
        ) : (
          <Table
            borderStyle={{
              borderWidth: 1,
              borderColor: "#c8e1ff",
              // borderRadius: 5,
            }}
          >
            <Row
              data={["Товар", "Оставток в кг", "Цена за продукт", "Сумма"]}
              style={styles.head}
              textStyle={styles.textTitle}
              flexArr={arrWidth}
            />
            <Rows data={listData} textStyle={styles.text} flexArr={arrWidth} />
          </Table>
        )}
        <Text style={styles.result}>Итого: {obj?.result} сом</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minWidth: "100%",
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 8,
    padding: 3,
  },
  head: { height: 75, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  textTitle: { margin: 6, fontSize: 14, fontWeight: 500 },
  noneData: {
    padding: 5,
    paddingBottom: 15,
    fontSize: 16,
  },
  result: {
    textAlign: "right",
    padding: 8,
    paddingRight: 10,
    fontSize: 18,
  },
});
