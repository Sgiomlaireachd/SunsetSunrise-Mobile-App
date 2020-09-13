import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Platform } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import styled from "styled-components/native";
import SunriseSunsetInfo from "./components/SunriseSunsetInfo";
import { sunriseAPI, coordinatesAPI } from "./api";
import CityInput from "./components/CityInput";

const getLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return null;
  } else {
    try {
      const location = await Location.getCurrentPositionAsync();
      return location;
    } catch {
      alert("Unable to find device location.");
    }
  }
};

export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [info, setInfo] = useState(null);

  const setCurrentLocationCoordinates = async () => {
    setInfo(null);
    const location = await getLocation();
    if (location)
      setCurrentLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
  };

  useEffect(() => {
    setCurrentLocationCoordinates();
  }, []);

  useEffect(() => {
    const inner = async () => {
      const { sunrise, sunset } = await sunriseAPI.getSunriseSunsetInfo(
        currentLocation.lat,
        currentLocation.lng
      );
      setInfo({ sunrise, sunset });
    };
    if (currentLocation) inner();
  }, [currentLocation]);

  const setNewLocation = async (location) => {
    if (!location) return;
    setInfo(null);
    const res = await coordinatesAPI.getCoordinatesByLocationName(location);
    let coordinates = null;
    if (res.data.results.length) coordinates = res.data.results[0].geometry;
    if (coordinates) setCurrentLocation({ ...coordinates });
  };

  return (
    <SafeAreaView>
      <HeaderText>Get information about Sunrise/Sunset!</HeaderText>
      <SunriseSunsetInfo info={info} />
      <CityInput setNewLocation={setNewLocation} />
      <MyLocationButton onPress={setCurrentLocationCoordinates}>
        <MyLocationText>Use My Location Instead</MyLocationText>
      </MyLocationButton>
    </SafeAreaView>
  );
}

const HeaderText = styled.Text`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin: 40px 0;
`;

const MyLocationButton = styled.TouchableOpacity`
  background: black;
  padding: 15px 25px;
  margin: 25px auto;
`;

const MyLocationText = styled.Text`
  color: white;
  text-align: center;
`;
