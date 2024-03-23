import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { ViewCheckBox } from "../customsTags/ViewCheckBox";
import styled from "styled-components/native";

const Div = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 0px 10px;
`;

export const EveryMyComming = ({ obj }) => {
  const [listData, setListData] = useState([]);

  const [ok, setOk] = useState(false);
  const [no, setNo] = useState(false);
  const clickApp = () => {
    console.log(obj);
  };

  const clickOkay = () => {
    setOk(true);
    setModalVisibleOk(true);
  };

  const clickNo = () => {
    setModalVisibleNo(true);
  };

  useEffect(() => {
    const tableDataList = obj?.list?.map((item, index) => {
      return [
        `   ${index + 1}`,
        `${item?.name}`,
        `${item?.ves?.toString()} ${item?.type?.toString()}`,
      ];
    });
    setListData(tableDataList);
  }, []);

  const arrWidth = [0.4, 2.2, 0.7];

  // const user = "https://iconape.com/wp-content/png_logo_vector/user-circle.png";

  console.log(listData, "listData");
  return (
    <>
      <View style={styles.container}>
        <Div style={{ justifyContent: "space-between", marginBottom: 5 }}>
          <Text style={styles.titleDate}>№: {obj.codeid} </Text>
          <Div style={{ paddingTop: 5 }}>
            <Text style={styles.titleMoreDate}>Дата: </Text>
            <Text style={styles.titleDate}>{obj?.date}</Text>
          </Div>
        </Div>
        <Div>
          {/* <Image style={styles.backgroundImage} source={{ uri: user }} /> */}
          <Text style={[styles.textTitle, { fontSize: 18, marginLeft: -3 }]}>
            Кто: {obj?.who}
          </Text>
        </Div>
        <Table>
          <Row
            data={["  № ", "Товар", "Вес (кол-во)"]}
            style={styles.head}
            textStyle={styles.textTitle}
            flexArr={arrWidth}
          />
          <Rows
            data={listData}
            textStyle={styles.text}
            flexArr={arrWidth}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(199, 210, 254, 0.718)",
            }}
          />
        </Table>
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
    paddingBottom: 12,
    paddingTop: 5,
  },
  head: { height: 60, backgroundColor: "rgba(199, 210, 254, 0.250)" },
  text: { margin: 6, marginBottom: 8, marginTop: 8 },
  // textTitle: { margin: 6, fontSize: 16, fontWeight: 500 },

  titleMoreDate: {
    fontSize: 15,
    color: "gray",
  },
  titleDate: {
    fontSize: 15,
    // font-weight: 400;
    color: "gray",
  },
  textTitle: {
    fontSize: 15,
    // fontWeight: 500,
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 15,
    paddingLeft: 5,
    color: "#383838",
  },
});
