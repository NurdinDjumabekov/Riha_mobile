import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLeftovers,
  getCategoryTA,
  getMyLeftovers,
} from "../store/reducers/requestSlice";
import { useEffect } from "react";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { ViewButton } from "../customsTags/ViewButton";
import { changeReturnInvoice } from "../store/reducers/stateSlice";
import { listTableLeftoverst } from "../helpers/Data";

export const LeftoversScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id, name } = route?.params;

  const { preloader, listLeftovers, createReturnInvoice } = useSelector(
    (state) => state.requestSlice
  );

  const agent_guid = "b3120f36-3fcd-4ca0-8346-484881974846";

  useEffect(() => {
    getData();
    return () => dispatch(changeLeftovers([]));
  }, []);

  const getData = async () => {
    // await dispatch(getCategoryTA(agent_guid)); /// на будущее
    await dispatch(getMyLeftovers(agent_guid));
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      // Если скролл достиг верхней границы
      getData();
    }
  };

  const windowWidth = Dimensions.get("window").width;
  const arrWidth = [35, 19, 14, 14, 18]; //  проценты %
  const resultWidths = arrWidth.map(
    (percentage) => (percentage / 100) * windowWidth
  );

  const returnTovar = () => {
    /// для создания возврата накладной
    navigation.navigate("ReturnInvoice");
    dispatch(
      changeReturnInvoice({
        ...createReturnInvoice,
        stateModal: true,
        agent_guid,
      })
    );
  };
  // console.log(listLeftovers, "listLeftovers");
  return (
    <ScrollView
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={400}
      refreshControl={
        <RefreshControl refreshing={preloader} onRefresh={getData} />
      }
    >
      <SafeAreaView>
        {listLeftovers?.length === 0 ? (
          <Text style={styles.noneData}>Остатка нет...</Text>
        ) : (
          <Table borderStyle={styles.styleHeadTable}>
            <Row
              data={listTableLeftoverst}
              style={styles.head}
              textStyle={{ margin: 3, fontSize: 13, fontWeight: 500 }}
              flexArr={resultWidths}
            />
            <TableWrapper style={{ flexDirection: "row" }}>
              <Rows
                data={listLeftovers.map((item) => [
                  item[0], // Товар
                  item[1], // Остаток на начало
                  <Text style={{ ...styles.textStyles, color: "green" }}>
                    {item[2]}
                  </Text>, // Приход
                  <Text style={{ ...styles.textStyles, color: "red" }}>
                    {item[3]}
                  </Text>, // Расход
                  item[4], // Остаток на конец
                ])}
                textStyle={styles.textStyles}
                flexArr={resultWidths}
              />
            </TableWrapper>
          </Table>
        )}
      </SafeAreaView>
      {listLeftovers?.length !== 0 && (
        <View style={styles.returnBlock}>
          <ViewButton styles={styles.return} onclick={returnTovar}>
            Сформировать накладную для возврата товара
          </ViewButton>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 10,
    marginBottom: 10,
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
  noneData: {
    flex: 1,
    height: 500,
    paddingTop: 250,
    textAlign: "center",
    fontSize: 20,
  },

  returnBlock: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "100%",
  },

  return: {
    fontSize: 14,
    color: "#fff",
    minWidth: "95%",
    paddingTop: 10,
    borderRadius: 10,
    fontWeight: 600,
    backgroundColor: "rgba(97 ,100, 239,0.7)",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  styleHeadTable: {
    borderWidth: 1,
    borderColor: "rgba(199, 210, 254, 0.718)",
    minWidth: "100%",
    textAlign: "center",
  },

  textStyles: {
    margin: 6,
    marginBottom: 8,
    marginTop: 8,
    fontSize: 12,
  },
});
