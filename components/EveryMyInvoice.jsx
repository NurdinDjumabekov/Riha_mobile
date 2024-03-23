import { Image, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { ViewButton } from "../customsTags/ViewButton";
import { clearAcceptInvoiceTA } from "../store/reducers/stateSlice";
import { useDispatch } from "react-redux";
import { tranformDateDay } from "../helpers/tranformDateDay";
import calendar from "../assets/icons/calendar.jpg";
import money from "../assets/icons/money.jpg";
import message from "../assets/icons/sendMessage.jpg";

const Div = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
  margin-bottom: 5;
  padding-left: 12px;
  padding-right: 12px;
`;

export const EveryMyInvoice = ({ obj, navigation }) => {
  //// список загрузок(накладных)
  const dispatch = useDispatch();

  // console.log(obj, "obj");
  const lookInvoice = () => {
    navigation.navigate("detailedInvoice", { date: obj.date, guid: obj.guid });
    dispatch(clearAcceptInvoiceTA());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleMoreDate}>№: {obj.codeid} </Text>
      <View>
        <Div>
          <Image style={styles.imgIcon} source={money} />
          <Text style={styles.titleDate}>1905{obj?.total_price} сом</Text>
        </Div>
        <Div>
          <Image style={styles.imgIcon} source={calendar} />
          <Text style={styles.titleDate}>{tranformDateDay(obj?.date)}</Text>
        </Div>
        <ViewButton styles={styles.btn} onclick={lookInvoice}>
          <Image style={styles.imgIcon} source={message} />
          Посмотреть
        </ViewButton>
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
    // paddingTop: 30,
    paddingTop: 10,
  },

  titleMoreDate: {
    fontSize: 20,
    color: "#fff",
    position: "absolute",
    top: -10,
    right: 15,
    zIndex: 10,
    backgroundColor: "rgb(102 105 245)",
    padding: 4,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 4,
  },
  titleDate: {
    fontSize: 20,
    // fontWeight: "400",
    color: "#475569",
  },
  imgIcon: {
    width: 35,
    height: 35,
  },

  btn: {
    backgroundColor: "transparent",
    color: "rgba(97 ,100, 239,0.7)",
    width: "100%",
    paddingTop: 0,
    borderRadius: 0,
    fontWeight: 600,
    borderTopWidth: 1,
    borderTopColor: "rgb(217 223 232)",
    marginTop: 5,
  },
});
