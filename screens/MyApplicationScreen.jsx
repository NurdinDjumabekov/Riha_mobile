import { useEffect } from "react";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyInvoice,
  changeListInvoices,
} from "../store/reducers/requestSlice";
import { EveryMyInvoice } from "../components/EveryMyInvoice";

export const MyApplicationScreen = ({ navigation, route }) => {
  /// загрузки
  const { preloader, listMyInvoice } = useSelector(
    (state) => state.requestSlice
  );
  const dispatch = useDispatch();

  const ParentDiv = styled.View`
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  `;

  useEffect(() => {
    dispatch(getMyInvoice({ obj: route?.params }));
    return () => dispatch(changeListInvoices([]));
  }, []);

  // console.log(listMyInvoice, "listMyInvoice");
  return (
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
            // numColumns={2}
            // keyExtractor={(item) => item.codeid}
            refreshControl={
              <RefreshControl
                refreshing={preloader}
                onRefresh={() => dispatch(getMyInvoice({ obj: route?.params }))}
              />
            }
          />
        </ParentDiv>
      </SafeAreaView>
    </ViewContainer>
  );
};
