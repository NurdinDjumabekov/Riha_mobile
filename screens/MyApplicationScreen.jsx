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
  getMyApplication,
} from "../store/reducers/requestSlice";
import { useEffect, useState } from "react";
import { EveryMyApplication } from "../components/EveryMyApplication";
import { ViewButton } from "../customsTags/ViewButton";
import ConfirmationModal from "../components/ConfirmationModal";

export const MyApplicationScreen = ({ navigation, route }) => {
  const { preloader, listMyApplication } = useSelector(
    (state) => state.requestSlice
  );
  const dispatch = useDispatch();
  const { id, name } = route?.params;

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
    dispatch(getMyApplication({ obj: route?.params }));
    return () => dispatch(changeApplication([]));
  }, []);

  // console.log(dataCategory, "dataCategory");
  // console.log(route?.params, "route");
  // console.log(id, "id");
  // console.log(API);
  // console.log(listMyApplication, "listMyApplication");

  const [modalVisibleOk, setModalVisibleOk] = useState(false);
  const [modalVisibleNo, setModalVisibleNo] = useState(false);

  const changeModalApplication = () => {};

  const closeModalOk = () => {
    setModalVisibleOk(false);
  };

  const closeModalNo = () => {
    setModalVisibleNo(false);
  };

  return (
    <>
      <ViewContainer>
        <SafeAreaView>
          <ParentDiv>
            <FlatList
              data={listMyApplication}
              renderItem={({ item }) => (
                <EveryMyApplication
                  obj={item}
                  setModalVisibleOk={setModalVisibleOk}
                  setModalVisibleNo={setModalVisibleNo}
                />
              )}
              keyExtractor={(item) => item.codeid}
              refreshControl={
                <RefreshControl
                  refreshing={preloader}
                  onRefresh={() =>
                    dispatch(getMyApplication({ obj: route?.params }))
                  }
                />
              }
            />
          </ParentDiv>
        </SafeAreaView>
      </ViewContainer>

      <ConfirmationModal
        visible={modalVisibleOk}
        message="Принять накладную ?"
        onYes={changeModalApplication}
        onNo={closeModalOk}
        onClose={closeModalOk}
      />
      <ConfirmationModal
        visible={modalVisibleNo}
        message="Отклонить накладную ?"
        onYes={changeModalApplication}
        onNo={closeModalNo}
        onClose={closeModalNo}
      />
    </>
  );
};
