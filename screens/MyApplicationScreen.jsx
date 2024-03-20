import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  changeApplication,
  getMyApplication,
} from "../store/reducers/requestSlice";
import { useEffect, useState } from "react";
import { EveryMyApplication } from "../components/EveryMyApplication";
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
