import React from "react";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";

const SunriseSunsetInfo = ({ info }) => {
  if (!info) return <WaitingText>Loading...</WaitingText>;
  return (
    <APIInfo>
      <InfoBlock>
        <InfoBlockHeader>Sunrise</InfoBlockHeader>
        <Feather name="sunrise" size={48} color="black" />
        <InfoBlockTime>{info.sunrise}</InfoBlockTime>
      </InfoBlock>
      <InfoBlock>
        <InfoBlockHeader>Sunset</InfoBlockHeader>
        <Feather name="sunset" size={48} color="black" />
        <InfoBlockTime>{info.sunset}</InfoBlockTime>
      </InfoBlock>
    </APIInfo>
  );
};

const APIInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InfoBlock = styled.View`
  padding: 0 30px;
  align-items: center;
`;

const WaitingText = styled.Text`
  font-size: 16px;
  color: lightgray;
  text-align: center;
`;

const InfoBlockHeader = styled.Text`
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 18px;
`;

const InfoBlockTime = styled.Text`
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
`;

export default React.memo(SunriseSunsetInfo);
