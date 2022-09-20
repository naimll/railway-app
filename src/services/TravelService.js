import { axiosTravel as axios } from "./axiosTravel";

export const getStationSelect = () => {
  return axios.get("/api/stations/getStationSelect");
};
