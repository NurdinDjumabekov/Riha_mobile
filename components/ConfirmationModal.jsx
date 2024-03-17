import React from "react";
import { Modal, View, Text, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { ViewButton } from "../customsTags/ViewButton";

const BackgroundOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const btns = {
  color: "#fff",
  elevation: 2,
  width: 100,
  paddingBottom: 8,
  paddingTop: 8,
};

const ConfirmationModal = ({ visible, message, onYes, onNo, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <BackgroundOverlay>
          <Container>
            <Text style={{ fontSize: 25, fontWeight: 500 }}>{message}</Text>
            <ButtonContainer>
              <ViewButton
                onclick={onYes}
                styles={{ ...btns, backgroundColor: "green" }}
              >
                Да
              </ViewButton>
              <ViewButton
                onclick={onNo}
                styles={{ ...btns, backgroundColor: "red" }}
              >
                Нет
              </ViewButton>
            </ButtonContainer>
          </Container>
        </BackgroundOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmationModal;
