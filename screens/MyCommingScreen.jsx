import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { dataCategory } from "../helpers/Data";
import { EveryCategory } from "../components/EveryCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  changeComming,
  changePreloader,
  getMyComming,
} from "../store/reducers/requestSlice";
import { useEffect, useState } from "react";
import { EveryMyComming } from "../components/EveryMyComming";

export const MyCommingScreen = ({ navigation, route }) => {
  //   const { start } = useSelector((state) => state.stateSlice);
  const { preloader, listComming } = useSelector((state) => state.requestSlice);
  const dispatch = useDispatch();

  const ParentDiv = styled.View`
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  `;

  useEffect(() => {
    dispatch(getMyComming({ obj: route?.params }));
    return () => dispatch(changeComming([]));
  }, []);

  const changeApplication = () => {};

  const closeModalOk = () => {};

  const closeModalNo = () => {};

  console.log(route, "route");
  return (
    <ViewContainer>
      <SafeAreaView>
        <ParentDiv>
          <FlatList
            data={listComming}
            renderItem={({ item }) => <EveryMyComming obj={item} />}
            keyExtractor={(item) => item.codeid}
            refreshControl={
              <RefreshControl
                refreshing={preloader}
                onRefresh={() => dispatch(getMyComming({ obj: route?.params }))}
              />
            }
          />
        </ParentDiv>
      </SafeAreaView>
    </ViewContainer>
  );
};
