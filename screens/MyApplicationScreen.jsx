import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyInvoice,
  changeListInvoices,
} from "../store/reducers/requestSlice";
import { useEffect, useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";
import { EveryMyInvoice } from "../components/EveryMyInvoice";

export const MyApplicationScreen = ({ navigation, route }) => {
  /// загрузки
  const { preloader, listMyInvoice } = useSelector(
    (state) => state.requestSlice
  );
  const dispatch = useDispatch();
  const { id, name } = route?.params;

  const ParentDiv = styled.View`
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  `;

  useEffect(() => {
    dispatch(getMyInvoice({ obj: route?.params }));
    return () => dispatch(changeListInvoices([]));
  }, []);

  const [modalVisibleOk, setModalVisibleOk] = useState(false);
  const [modalVisibleNo, setModalVisibleNo] = useState(false);

  const changeModalApplication = () => {};

  const closeModalOk = () => {
    setModalVisibleOk(false);
  };

  const closeModalNo = () => {
    setModalVisibleNo(false);
  };

  // console.log(listMyInvoice, "listMyInvoice");

  return (
    <>
      <ViewContainer>
        <SafeAreaView>
          <ParentDiv>
            <FlatList
              contentContainerStyle={{
                minWidth: "100%",
                width: "100%",
              }}
              data={listMyInvoice}
              renderItem={({ item }) => (
                <EveryMyInvoice obj={item} navigation={navigation} />
              )}
              // keyExtractor={(item) => item.codeid}
              refreshControl={
                <RefreshControl
                  refreshing={preloader}
                  onRefresh={() =>
                    dispatch(getMyInvoice({ obj: route?.params }))
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
