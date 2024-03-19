import { Alert, Button, Modal, Text, View } from "react-native";
import styled from "styled-components/native";
import { ViewCheckBox } from "../customsTags/ViewCheckBox";
import { useState } from "react";

const ParentDiv = styled.View`
  min-width: 100%;
  padding: 10px 10px 20px;
  border-radius: 8px;
  position: realative;
  background-color: #fff;
  margin-bottom: 10px;
`;

const TextTitleMore = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

// font-family: "Inter", sans-serif;
const TextTitle = styled.Text`
  font-size: 17px;
  font-weight: 500;
  display: inline;
`;

const Div = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const DivProd = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  margin-top: 8px;
`;

const DivInner = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border-bottom-color: #989393;
  border-bottom-width: 1px;
  width: 100%;
  margin-bottom: 5px;
  padding-bottom: 4px;
`;

const TextInner = styled.Text`
  display: inline;
  font-size: 17px;
  font-weight: 400;
`;

const DivActions = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 15px;
  width: 100%;
  padding-right: 20px;
  margin-top: 10px;
`;

export const EveryMyApplication = ({
  obj,
  setModalVisibleOk,
  setModalVisibleNo,
}) => {
  const [ok, setOk] = useState(false);
  const [no, setNo] = useState(false);
  const clickApp = () => {
    console.log(obj);
  };

  const clickOkay = () => {
    setOk(true);
    setModalVisibleOk(true);
  };

  const clickNo = () => {
    setModalVisibleNo(true);
  };

  //   console.log(obj?.list, "obj");
  return (
    <>
      <ParentDiv onPress={clickApp}>
        <Div>
          <TextTitleMore>Кто: </TextTitleMore>
          <TextTitle>{obj?.who}</TextTitle>
        </Div>
        <Div>
          <TextTitleMore style={{fontSize:15,color:"gray"}}>Дата: </TextTitleMore>
          <TextTitle style={{fontSize:15,color:"gray"}}>{obj?.date}</TextTitle>
        </Div>
        <DivProd>
          {obj?.list?.map((item, index) => (
            <DivInner key={item?.codeid}>
              <TextInner>{index + 1}. </TextInner>
              <TextInner>
                {item?.name}, {item?.ves} {item?.type}
              </TextInner>
            </DivInner>
          ))}
          <DivActions>
            {+obj?.status === 0 ? (
              <>
                <ViewCheckBox onclick={clickOkay} type={1} />
                <ViewCheckBox onclick={clickNo} type={2} />
              </>
            ) : (
              <></>
            )}
          </DivActions>
        </DivProd>
      </ParentDiv>
    </>
  );
};
