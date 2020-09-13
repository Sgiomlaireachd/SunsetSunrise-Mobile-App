import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const CityInput = ({ setNewLocation }) => {
  const [inputValue, setInputValue] = useState("");

  const buttonClickHandler = (e) => {
    setNewLocation(inputValue);
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.nativeEvent.text);
  };

  return (
    <InputBlock>
      <InputBlockText>
        Input name of the city to get Sunrise/Sunset info:
      </InputBlockText>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          padding: 10,
        }}
        value={inputValue}
        onChange={inputChangeHandler}
      />
      <InputBlockButton onPress={buttonClickHandler}>
        <InputBlockText>Search</InputBlockText>
      </InputBlockButton>
    </InputBlock>
  );
};

const InputBlock = styled.View`
  width: 85%;
  margin: 0 auto;
  margin-top: 50px;
`;

const InputBlockText = styled.Text`
  margin-bottom: 10px;
  color: white;
  text-align: center;
`;

const InputBlockButton = styled.TouchableOpacity`
  background: black;
  padding: 15px;
`;

export default CityInput;
