import { SafeAreaView, FlatList, RefreshControl, Text } from "react-native";
import styled from "styled-components/native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { dataCategory } from "../helpers/Data";
import { EveryCategory } from "../components/EveryCategory";
import { useDispatch, useSelector } from "react-redux";
import { changePreloader } from "../store/reducers/requestSlice";

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
    <ViewContainer>
      <SafeAreaView>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <ParentDiv>
          <FlatList
            contentContainerStyle={{
              // minWidth: "100%",
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
  );
};
