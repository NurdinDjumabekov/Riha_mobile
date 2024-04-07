import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMyLeftovers } from "../store/reducers/requestSlice";
import { ScrollView } from "react-native";
import { listTableForReturnProd } from "../helpers/Data";
import { Dimensions } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";
import { CheckVes } from "../components/ReturnProducts/CheckVes";
import { changeReturnProd } from "../store/reducers/stateSlice";

export const ReturnProdScreen = ({ route }) => {
  const { invoice_guid } = route.params;
  //// возрат товара
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  const { listLeftoversForReturn } = useSelector((state) => state.requestSlice);
  const { returnProducts } = useSelector((state) => state.stateSlice);

  useEffect(() => {
    dispatch(getMyLeftovers(agent_guid));
  }, []);

  useEffect(() => {
    if (listLeftoversForReturn) {
      const tableDataList = listLeftoversForReturn?.map((item) => {
        return [
          `${item?.codeid}. ${item?.product_name}`,
          `${item?.end_outcome}`,
          <CheckVes
            guidProduct={item?.product_guid}
            invoice_guid={invoice_guid}
          />,
          // <CheckBoxTable
          //   guidProduct={item?.guid}
          //   guidInvoice={everyInvoice?.guid}
          // />,
        ];
      });
      setListData(tableDataList);
    }
    dispatch(
      changeReturnProd({
        ...returnProducts,
        invoice_guid,
        products: listLeftoversForReturn?.map((i) => {
          return {
            guid: i?.product_guid,
            is_checked: false,
            count: i?.end_outcome,
          };
        }),
      })
    ); //// сразу присваиваю guid накладной
  }, [listLeftoversForReturn]);

  const createInvoice = () => {};
  console.log(listLeftoversForReturn, "listLeftoversForReturn");
  //   console.log(listLeftovers, "listLeftovers");

  const windowWidth = Dimensions.get("window").width;
  const arrWidth = [48, 19, 19, 14]; //  проценты %

  // Преобразуем проценты в абсолютные значения ширины
  const resultWidths = arrWidth.map(
    (percentage) => (percentage / 100) * windowWidth
  );

  console.log(returnProducts, "returnProducts");
  return (
    <ScrollView>
      <View style={styles.container}>
        <Table>
          <Row
            data={listTableForReturnProd}
            style={styles.head}
            textStyle={styles.textTitle}
            widthArr={resultWidths}
          />
          <Rows
            data={listData}
            textStyle={styles.text}
            widthArr={resultWidths}
            style={styles.rowStyle}
          />
        </Table>
        {/* <View style={styles.divAction}>
          <View style={styles.divActionInner}>
            <View style={styles.blockTotal}>
              <Text style={styles.totalItemCount}>Сумма: {totalSum} сом</Text>
              <Text style={styles.totalItemCount}>
                Кол-во: {totalItemCountt}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={changeAllCheckbox}>
            <View style={styles.standartBox}>
              <View style={styles.standartBox__inner}>
                <View style={styles.checkmark}></View>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
        {/* {isTrue && (
          <ViewButton styles={styles.sendBtn} onclick={clickOkay}>
            Принять накладную
          </ViewButton>
        )} */}
      </View>
      {/* <ConfirmationModal
        visible={modalVisibleOk}
        message="Принять накладную ?"
        onYes={changeModalApplication}
        onNo={() => setModalVisibleOk(false)}
        onClose={() => setModalVisibleOk(false)}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minWidth: "100%",
    marginBottom: 20,
    marginTop: 0,
    borderRadius: 8,
    paddingBottom: 102,
    paddingTop: 5,
  },
  head: { height: 60, backgroundColor: "rgba(199, 210, 254, 0.250)" },
  text: {
    margin: 4,
    marginBottom: 8,
    marginTop: 8,
    backgroundColor: "red",
    fontSize: 13,
  },
  titleDate: {
    fontSize: 20,
    fontWeight: "500",
    color: "#222",
  },

  rowStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(199, 210, 254, 0.718)",
    paddingLeft: 2,
  },

  textTitle: {
    fontSize: 13,
    fontWeight: "500",
    paddingRight: 0,
    paddingLeft: 5,
    color: "#383838",
  },
  divAction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 5,
    width: "100%",
    paddingRight: 20,
    paddingLeft: 10,
    marginTop: 10,
  },

  blockTotal: {
    paddingTop: 10,
  },
  divActionInner: {},

  totalItemCount: {
    fontSize: 18,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.991)",
  },

  /////// checkbox
  standartBox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "rgb(206 217 230)",
    borderRadius: 7,
    backgroundColor: "rgba(95, 230, 165, 0.99)",
  },
  standartBox__inner: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 3,
  },
  checkmark: {
    width: 15,
    height: 23,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "white",
    transform: [{ rotate: "45deg" }],
  },
  /////// checkbox

  sendBtn: {
    backgroundColor: "#c2f8e2",
    color: "#1ab782",
    width: "95%",
    alignSelf: "center",
    position: "absolute",
    bottom: -80,
  },
});
