import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { getMyEveryInvoice } from "../store/reducers/requestSlice";
import { Row, Rows, Table } from "react-native-table-component";
import { transformDate } from "../helpers/transformDate";
import { changeAcceptInvoiceTA } from "../store/reducers/stateSlice";
import { CheckBoxTable } from "../components/CheckBoxTable";

const Div = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 0px 10px;
`;

export const DetailedInvoice = ({ route }) => {
  const { date, guid } = route.params;
  const [listData, setListData] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState(false);

  const dispatch = useDispatch();
  const { preloader, everyInvoice } = useSelector(
    (state) => state.requestSlice
  );

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

  console.log(everyInvoice?.list, "everyInvoice");

  // const checkCheckBox = (guid) => {
  //   setCheckboxStates(!checkboxStates);
  //   // dispatch(changeAcceptInvoiceTA())
  //   console.log(guid, "guid");
  // };

  useEffect(() => {
    dispatch(getMyEveryInvoice(guid));
  }, []);

  useEffect(() => {
    if (everyInvoice && everyInvoice.list) {
      const tableDataList = everyInvoice?.list?.map((item, index) => {
        return [
          `  ${index + 1}`,
          `${item?.product_name}`,
          `${item?.count}`,
          <CheckBoxTable guid={item?.guid} />,
        ];
      });
      setListData(tableDataList);
    }
  }, [everyInvoice]);

  const windowWidth = Dimensions.get("window").width;
  const arrWidth = [10, 47, 18, 25]; //  проценты %

  // Преобразуем проценты в абсолютные значения ширины
  const resultWidths = arrWidth.map(
    (percentage) => (percentage / 100) * windowWidth
  );

  console.log(listData, "listDataыыы");
  return (
    <>
      <View style={styles.container}>
        <Div style={{ justifyContent: "space-between", marginBottom: 5 }}>
          <Text style={styles.titleDate}>№: {everyInvoice.codeid} </Text>
          <Div style={{ paddingTop: 5 }}>
            <Text style={styles.titleMoreDate}>Дата: </Text>
            <Text style={styles.titleDate}>
              {transformDate(everyInvoice?.date)}
            </Text>
          </Div>
        </Div>
        <Div>
          {/* <Image style={styles.backgroundImage} source={{ uri: user }} /> */}
          {/* <Text style={styles.textTitle}>{everyInvoice?.who}</Text> */}
        </Div>
        <Table>
          <Row
            data={["  № ", "Товар", "Вес (кол-во)", "........"]}
            style={styles.head}
            textStyle={styles.textTitle}
            widthArr={resultWidths}
          />
          <Rows
            data={listData}
            textStyle={styles.text}
            widthArr={resultWidths}
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
  textTitle: { margin: 6, fontSize: 16, fontWeight: 500 },

  titleMoreDate: {
    display: "inline",
    fontSize: 15,
    color: "gray",
  },
  titleDate: {
    display: "inline",
    fontSize: 15,
    // font-weight: 400;
    color: "gray",
  },
  textTitle: {
    fontSize: 15,
    // fontWeight: 500,
    display: "inline",
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 15,
    paddingLeft: 5,
    color: "#383838",
  },
});

// divActions: {
//   display: "flex",
//   flexDirection: "row",
//   alignItems: "flex-end",
//   justifyContent: "flex-end",
//   gap: 15,
//   width: "100%",
//   paddingRight: 20,
//   marginTop: 10,
// },

// backgroundImage: {
//   display: "block",
//   width: 30,
//   height: 30,
//   borderRadius: 8,
//   marginLeft: -3,
// },
