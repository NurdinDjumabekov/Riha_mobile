import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { getCategoryTA, getProductTA } from "../store/reducers/requestSlice";
import { EveryProduct } from "../components/EveryProduct";
import { ViewButton } from "../customsTags/ViewButton";
import { AddProductsTA } from "../components/TAComponents/AddProductsTA";
import { changeTemporaryData } from "../store/reducers/stateSlice";

export const EveryInvoice = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { codeid, guid } = route.params;
  const [review, setReview] = useState(false);
  const { temporaryData } = useSelector((state) => state.stateSlice);
  const { preloader, listCategoryTA, listProductTA } = useSelector(
    (state) => state.requestSlice
  );

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  useEffect(() => {
    getData();
    return () => dispatch(changeTemporaryData({})); /// очищаю временный state
  }, [codeid]);

  const getData = async () => {
    await dispatch(getCategoryTA(agent_guid));
    await dispatch(
      getProductTA({
        guid: "0",
        agent_guid: agent_guid,
      })
    ); /// 0 - все продукты
  };

  const changeSelect = (guid) => {
    dispatch(getProductTA({ guid, agent_guid: agent_guid }));
  };

  return (
    <ViewContainer>
      <SafeAreaView style={styles.parentBlock}>
        <View style={styles.actionBlock}>
          <ViewButton
            styles={[styles.btnChoice, !review && styles.btnChoiceActive]}
            onclick={() => setReview(false)}
          >
            Выбор категорий
          </ViewButton>
          <ViewButton
            styles={[styles.btnChoice, review && styles.btnChoiceActive]}
            onclick={() => setReview(true)}
          >
            Посмотреть список
          </ViewButton>
        </View>
        {review ? (
          <></>
        ) : (
          <>
            <View style={styles.selectBlock}>
              <RNPickerSelect
                onValueChange={changeSelect}
                items={listCategoryTA}
                placeholder={{ label: "Все", value: 0 }}
                placeholderTextColor="black"
              />
            </View>
            <FlatList
              contentContainerStyle={{
                minWidth: "100%",
                width: "100%",
              }}
              data={listProductTA}
              renderItem={({ item, index }) => (
                <EveryProduct obj={item} index={index} />
              )}
              keyExtractor={(item) => item.guid}
              refreshControl={
                <RefreshControl refreshing={preloader} onRefresh={getData} />
              }
            />
            {Object.keys(temporaryData).length !== 0 && <AddProductsTA />}
          </>
        )}
      </SafeAreaView>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  parentBlock: { flex: 1, position: "relative" },
  actionBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  btnChoice: {
    backgroundColor: "#fff",
    color: "rgba(97 ,100, 239,0.7)",
    minWidth: "49%",
    paddingTop: 12,
    borderRadius: 10,
    fontWeight: 600,
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    fontSize: 18,
  },
  btnChoiceActive: {
    backgroundColor: "rgba(47, 71, 190, 0.672)",
    color: "#fff",
  },
  selectBlock: {
    backgroundColor: "#fff",
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "rgb(217 223 232)",
    borderRadius: 6,
    minWidth: "100%",
  },
});
