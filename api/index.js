import * as axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.sunrise-sunset.org",
});

export const sunriseAPI = {
  getSunriseSunsetInfo: async (lat, lng) => {
    const res = await axiosInstance.get(`/json?lat=${lat}&lng=${lng}`);
    return res.data.results;
  },
};

export const coordinatesAPI = {
  getCoordinatesByLocationName: async (locationName) => {
    // pls don't use my api key for evil :(
    const res = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${locationName}&key=52eab8ad321142daaa71a165c31e4c05`
    );
    return res;
  },
};
