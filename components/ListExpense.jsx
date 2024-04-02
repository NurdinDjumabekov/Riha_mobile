import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const ListExpense = ({ getData }) => {
  const dispatch = useDispatch();
  const { preloader, listExpenses } = useSelector(
    (state) => state.requestSlice
  );
  // console.log(listExpenses, "listExpenses");

  return (
    <SafeAreaView style={styles.parentBlock}>
      <Text style={styles.titleExpenses}>
        Расходы ({listExpenses?.[0]?.point})
      </Text>
      <FlatList
        contentContainerStyle={{ width: "100%" }}
        data={listExpenses}
        // data={[...listExpenses, ...listExpenses, ...listExpenses]}
        renderItem={({ item }) => (
          <View style={styles.everyProd}>
            <View style={styles.everyProdInner}>
              <View style={styles.blockTitle}>
                <Text style={styles.title}>
                  {item?.seller_fio} ({item.name})
                </Text>
                <Text style={styles.comment}>
                  {item.comment === "" ? "..." : item.comment}
                </Text>
              </View>
              <View>
                <Text style={styles.date}>{item.date_system}</Text>
                <Text style={styles.sum}>{item.amount} сом</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.guid}
        refreshControl={
          <RefreshControl refreshing={preloader} onRefresh={() => getData()} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentBlock: {
    flex: 1,
    maxHeight: "100%",
    // paddingBottom: "105%",
  },
  titleExpenses: {
    fontSize: 17,
    fontWeight: "500",
    padding: 15,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
    color: "#222",
  },
  everyProd: {
    padding: 15,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
    // marginBottom: 10,
    // borderRadius: 6,
    // shadowColor: "#000",
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 2,
    // borderWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.107)",
    borderTopWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.287)",
  },
  everyProdInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },

  comment: {
    fontSize: 14,
    fontWeight: "400",
  },

  date: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(47, 71, 190, 0.687)",
  },

  sum: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(12, 169, 70, 0.9)",
  },

  blockTitle: { width: "60%" },
});
