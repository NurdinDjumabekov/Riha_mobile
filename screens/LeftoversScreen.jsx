import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLeftovers,
  getCategoryTA,
  getMyLeftovers,
} from "../store/reducers/requestSlice";
import { useEffect } from "react";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";

export const LeftoversScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { id, name } = route?.params;

  const { preloader, listLeftovers } = useSelector(
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

  // console.log(listLeftovers, "listLeftovers");

  const textStyles = {
    margin: 6,
    marginBottom: 8,
    marginTop: 8,
    fontSize: 12,
  };

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
              <Rows
                data={listLeftovers.map((item) => [
                  item[0], // Товар
                  item[1], // Остаток на начало
                  <Text style={{ ...textStyles, textStyles, color: "green" }}>
                    {item[2]}
                  </Text>, // Приход
                  <Text style={{ ...textStyles, textStyles, color: "red" }}>
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
});
