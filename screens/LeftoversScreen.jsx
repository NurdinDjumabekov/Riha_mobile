import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  changeApplication,
  changeLeftovers,
  getMyApplication,
  getMyLeftovers,
} from "../store/reducers/requestSlice";
import { useEffect, useState } from "react";
import { EveryMyApplication } from "../components/EveryMyApplication";
import { ViewButton } from "../customsTags/ViewButton";
import ConfirmationModal from "../components/ConfirmationModal";
import { EveryLeftovers } from "../components/EveryLeftovers";

export const LeftoversScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { id, name } = route?.params;

  const { preloader, listLeftovers } = useSelector(
    (state) => state.requestSlice
  );

  const ParentDiv = styled.View`
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  `;

  const ViewAction = styled.View`
    min-width: 70%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  `;

  const ConfirmText = styled.Text`
    font-size: 25px;
    font-weight: 500;
  `;

  const BackgroundOverlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
  `;

  const btns = {
    color: "#fff",
    elevation: 2,
    width: 100,
    paddingBottom: 8,
    paddingTop: 8,
  };

  useEffect(() => {
    dispatch(getMyLeftovers({ obj: route?.params }));
    return () => dispatch(changeLeftovers([]));
  }, []);

//   console.log(listLeftovers, "listLeftovers");

  return (
    <>
      <ViewContainer>
        <SafeAreaView>
          <ParentDiv>
            <FlatList
              data={listLeftovers}
              renderItem={({ item }) => <EveryLeftovers obj={item} />}
              keyExtractor={(item) => item.codeid}
              refreshControl={
                <RefreshControl
                  refreshing={preloader}
                  onRefresh={() =>
                    dispatch(getMyLeftovers({ obj: route?.params }))
                  }
                />
              }
            />
          </ParentDiv>
        </SafeAreaView>
      </ViewContainer>
    </>
  );
};
