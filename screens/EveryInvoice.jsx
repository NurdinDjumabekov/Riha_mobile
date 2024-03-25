import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { getCategoryTA, getProductTA } from "../store/reducers/requestSlice";
import { EveryProduct } from "../components/EveryProduct";

export const EveryInvoice = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { codeid, guid } = route.params;
  const [review, setReview] = useState(false);
  const { preloader, listCategoryTA, listProductTA } = useSelector(
    (state) => state.requestSlice
  );

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  useEffect(() => {
    getData();
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
      <SafeAreaView>
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
          </>
        )}
      </SafeAreaView>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
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
