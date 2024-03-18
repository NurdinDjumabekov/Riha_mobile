import styled from "styled-components/native";

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
  display: inline;
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
`;
const TextInner = styled.Text`
  display: inline;
  font-size: 17px;
  font-weight: 400;
`;

const TextTitleMoreDate = styled.Text`
  display: inline;
  font-size: 15px;
  font-weight: 400;
  color: gray;
`;

const TextTitleDate = styled.Text`
  display: inline;
  font-size: 15px;
  font-weight: 400;
  color: gray;
`;

export const EveryMyComming = ({ obj }) => {
  const clickApp = () => {
    console.log(obj);
  };

  return (
    <>
      <ParentDiv onPress={clickApp}>
        <Div style={{ justifyContent: "space-between", marginBottom: 5 }}>
          <TextTitleMore>№: {obj.codeid} </TextTitleMore>
          <Div>
            <TextTitleMoreDate>Дата: </TextTitleMoreDate>
            <TextTitleDate>{obj?.date}</TextTitleDate>
          </Div>
        </Div>
        <Div>
          <TextTitleMore>Кто: </TextTitleMore>
          <TextTitle>{obj?.who}</TextTitle>
        </Div>
        <Div>
          <TextTitleMore>Кому: </TextTitleMore>
          <TextTitle>{obj?.who}</TextTitle>
        </Div>

        <DivProd>
          {obj?.list?.map((item, index) => (
            <DivInner key={item?.codeid}>
              <TextInner>{index + 1}. </TextInner>
              <TextInner>
                {item?.name}, {item?.ves} {item?.type}
              </TextInner>
              {/* <Text>
            </Text> */}
            </DivInner>
          ))}
        </DivProd>
      </ParentDiv>
    </>
  );
};
