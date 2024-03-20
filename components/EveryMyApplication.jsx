import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { ViewCheckBox } from "../customsTags/ViewCheckBox";
import styled from "styled-components/native";

const Div = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 0px 10px;
`;

export const EveryMyApplication = ({
  obj,
  setModalVisibleOk,
  setModalVisibleNo,
}) => {
  const [listData, setListData] = useState([]);

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

  useEffect(() => {
    const tableDataList = obj?.list?.map((item, index) => {
      return [
        `   ${index + 1}`,
        `${item?.name}`,
        `${item?.ves?.toString()} ${item?.type?.toString()}`,
      ];
    });
    setListData(tableDataList);
  }, []);

  const arrWidth = [0.4, 2.2, 0.7];

  const user = "https://iconape.com/wp-content/png_logo_vector/user-circle.png";

  // console.log(listData, "listData");
  return (
    <>
      <View style={styles.container}>
        <Div style={{ justifyContent: "space-between", marginBottom: 5 }}>
          <Text style={styles.titleDate}>№: {obj.codeid} </Text>
          <Div style={{ paddingTop: 5 }}>
            <Text style={styles.titleMoreDate}>Дата: </Text>
            <Text style={styles.titleDate}>{obj?.date}</Text>
          </Div>
        </Div>
        <Div>
          <Image style={styles.backgroundImage} source={{ uri: user }} />
          <Text style={styles.textTitle}>{obj?.who}</Text>
        </Div>
        <Table>
          <Row
            data={["  № ", "Товар", "Вес (кол-во)"]}
            style={styles.head}
            textStyle={styles.textTitle}
            flexArr={arrWidth}
          />
          <Rows
            data={listData}
            textStyle={styles.text}
            flexArr={arrWidth}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(199, 210, 254, 0.718)",
            }}
          />
        </Table>
        <View style={styles.divActions}>
          {+obj?.status === 0 ? (
            <>
              <ViewCheckBox onclick={clickOkay} type={1} />
              <ViewCheckBox onclick={clickNo} type={2} />
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minWidth: "100%",
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 8,
    paddingBottom: 12,
    paddingTop: 5,
  },
  head: { height: 60, backgroundColor: "rgba(199, 210, 254, 0.250)" },
  text: { margin: 6, marginBottom: 8, marginTop: 8 },
  textTitle: { margin: 6, fontSize: 16, fontWeight: 500 },
  divActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 15,
    width: "100%",
    paddingRight: 20,
    marginTop: 10,
  },

  backgroundImage: {
    display: "block",
    width: 30,
    height: 30,
    borderRadius: 8,
    marginLeft: -3,
  },
  titleMoreDate: {
    display: "inline",
    fontSize: 1,
    color: "gray",
  },
  titleDate: {
    display: "inline",
    fontSize: 15,
    // font-weight: 400;
    color: "gray",
  },
  textTitle: {
    fonSsize: 17,
    // fontWeight: 500,
    display: "inline",
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 15,
    paddingLeft: 5,
    color: "#383838",
  },
});

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// import { Alert, Button, Modal, Text, View } from "react-native";
// import styled from "styled-components/native";
// import { ViewCheckBox } from "../customsTags/ViewCheckBox";
// import { useState } from "react";

// const ParentDiv = styled.View`
//   min-width: 100%;
//   padding: 10px 10px 20px;
//   border-radius: 8px;
//   position: realative;
//   background-color: #fff;
//   margin-bottom: 10px;
// `;

// const TextTitleMore = styled.Text`
//   font-size: 18px;
//   font-weight: 500;
// `;

// // font-family: "Inter", sans-serif;
// const TextTitle = styled.Text`
//   font-size: 17px;
//   font-weight: 500;
//   display: inline;
// `;

// const Div = styled.View`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   gap: 4px;
// `;

// const DivProd = styled.View`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 2px;
//   margin-top: 8px;
// `;

// const DivInner = styled.View`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   border-bottom-color: rgba(199, 210, 254, 0.597);
//   border-bottom-width: 1px;
//   width: 100%;
//   margin-bottom: 5px;
//   padding-bottom: 4px;
// `;

// const TextInner = styled.Text`
//   display: inline;
//   font-size: 16px;
//   font-weight: 400;
// `;

// const DivActions = styled.View`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-end;
//   justify-content: flex-end;
//   gap: 15px;
//   width: 100%;
//   padding-right: 20px;
//   margin-top: 10px;
// `;

// const TextTitleMoreDate = styled.Text`
//   display: inline;
//   font-size: 15px;
//   font-weight: 400;
//   color: gray;
// `;

// const TextTitleDate = styled.Text`
//   display: inline;
//   font-size: 15px;
//   font-weight: 400;
//   color: gray;
// `;

// const BackgroundImage = styled.Image`
//   display: block;
//   width: 30px;
//   height: 30px;
//   border-radius: 8px;
//   margin-left: -3px;
// `;

// export const EveryMyApplication = ({
//   obj,
//   setModalVisibleOk,
//   setModalVisibleNo,
// }) => {
//   const [ok, setOk] = useState(false);
//   const [no, setNo] = useState(false);
//   const clickApp = () => {
//     console.log(obj);
//   };

//   const clickOkay = () => {
//     setOk(true);
//     setModalVisibleOk(true);
//   };

//   const clickNo = () => {
//     setModalVisibleNo(true);
//   };

//   const user = "https://iconape.com/wp-content/png_logo_vector/user-circle.png";
//   //   console.log(obj?.list, "obj");

//   return (
//     <>
//       <ParentDiv onPress={clickApp}>
//         <Div style={{ justifyContent: "space-between", marginBottom: 5 }}>
//           <TextTitleDate>№: {obj.codeid} </TextTitleDate>
//           <Div>
//             <TextTitleMoreDate>Дата: </TextTitleMoreDate>
//             <TextTitleDate>{obj?.date}</TextTitleDate>
//           </Div>
//         </Div>
//         <Div style={{ marginTop: 5 }}>
//           {/* <TextTitleMore>Кто: </TextTitleMore> */}
//           <BackgroundImage source={{ uri: user }} />
//           <TextTitle>{obj?.who}</TextTitle>
//         </Div>
//         <DivProd>
//           {obj?.list?.map((item, index) => (
//             <DivInner key={item?.codeid}>
//               <TextInner>{index + 1}. </TextInner>
//               <TextInner>
//                 {item?.name}, {item?.ves} {item?.type}
//               </TextInner>
//             </DivInner>
//           ))}
//           <DivActions>
//             {+obj?.status === 0 ? (
//               <>
//                 <ViewCheckBox onclick={clickOkay} type={1} />
//                 <ViewCheckBox onclick={clickNo} type={2} />
//               </>
//             ) : (
//               <></>
//             )}
//           </DivActions>
//         </DivProd>
//       </ParentDiv>
//     </>
//   );
// };
