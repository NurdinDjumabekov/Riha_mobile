import { Image, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { transformDate } from "../helpers/transformDate";
import { ViewButton } from "../customsTags/ViewButton";
import { ViewImg } from "../customsTags/ViewImg";
import calendar from "../assets/icons/calendar.jpg";
import money from "../assets/icons/money.jpg";

const Div = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
  margin-bottom: 5;
`;

export const EveryMyInvoice = ({ obj, navigation }) => {
  //// каждая загрузка(накладная)

  // console.log(obj, "obj");
  const lookInvoice = () => {
    navigation.navigate("detailedInvoice", { date: obj.date, guid: obj.guid });
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.titleDate}>№: {obj.codeid} </Text> */}
      <View>
        <Div>
          <Image style={styles.imgIcon} source={calendar} />
          <Text style={styles.titleDate}>{transformDate(obj?.date)}</Text>
        </Div>
        <Div>
          <Image style={styles.imgIcon} source={money} />
          <Text style={styles.totalPrice}>{obj?.total_price} сом</Text>
        </Div>
        <Div>
          <ViewButton styles={styles.btn} onclick={lookInvoice}>
            Посмотреть ...
          </ViewButton>
        </Div>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minWidth: "100%",
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
    paddingBottom: 12,
    paddingTop: 5,
    paddingLeft: 12,
    paddingRight: 12,
  },

  titleMoreDate: {
    display: "inline",
    fontSize: 20,
    color: "#475569",
  },
  titleDate: {
    display: "inline",
    fontSize: 22,
    // fontWeight: "400",
    color: "#475569",
  },
  imgIcon: {
    width: 45,
    height: 45,
  },
  totalPrice: {
    fontSize: 25,
    // color: "rgba(5, 146, 102,0.73)",
    // backgroundColor: "rgba(202, 243 ,222 , 0.96)",
    paddingBottom: 3,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "rgba(97 ,100, 239,0.7)",
    color: "#fff",
    width: "100%",
    paddingTop: 9,
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
