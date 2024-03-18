import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import styled from "styled-components/native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { dataCategory } from "../helpers/Data";
import { EveryCategory } from "../components/EveryCategory";
import { useDispatch, useSelector } from "react-redux";
import { changePreloader } from "../store/reducers/requestSlice";
import { ViewImg } from "../customsTags/ViewImg";

export const MainScreen = ({ navigation }) => {
  //   const { start } = useSelector((state) => state.stateSlice);
  const { preloader } = useSelector((state) => state.requestSlice);
  const dispatch = useDispatch();

  const ParentDiv = styled.View`
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  `;

  const chnagePreloader = () => {
    dispatch(changePreloader(true));
    setTimeout(() => {
      dispatch(changePreloader(false));
    }, 1000);
  }; // console.log(dataCategory, "dataCategory");

  return (
    <View style={{ paddingTop: 20, backgroundColor: "#ebeef2" }}>
      <ViewContainer>
        <SafeAreaView>
          <ParentDiv>
            <FlatList
              contentContainerStyle={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 10,
              }}
              data={dataCategory}
              renderItem={({ item }) => (
                <EveryCategory obj={item} navigation={navigation} />
              )}
              // keyExtractor={(item) => item.codeid}
              //  numColumns={2}
              refreshControl={
                <RefreshControl
                  refreshing={preloader}
                  onRefresh={() => chnagePreloader()}
                />
              }
            />
          </ParentDiv>
        </SafeAreaView>
      </ViewContainer>
    </View>
  );
};
