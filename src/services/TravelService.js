import { axiosTravel as axios } from "./axiosTravel";

export const getStationSelect = () => {
  return axios.get("/api/stations/getStationSelect");
};
export const AddAttraction = (attractionName, location, description, file) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  // formData.append("attraction", attractionName);
  // formData.append("location", location);
  // formData.append("description", description);
  formData.append("file", file, config);
  return axios.post(
    `/api/attractions?attraction=${attractionName}&location=${location}&description=${description}`,
    formData,
    config
  );
};

export const GetAttractions = () => {
  return axios.get("/api/attractions");
};
export const DeleteAttraction = (attractionId) => {
  return axios.delete(`/api/attractions/${attractionId}`);
};
export const GetAttractionById = (id) => {
  return axios.get(`/api/attractions/attractions/${id}`);
};
export const UpdateAttraction = (
  id,
  attractionName,
  location,
  description,
  image,
  file
) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  // formData.append("id", id);
  // formData.append("attraction", attractionName);
  // formData.append("location", location);
  // formData.append("description", description);
  // formData.append("image", fileName);

  formData.append("file", file, config);
  return axios.post(
    `/api/attractions/updateAttraction?id=${id}&attractionName=${attractionName}&description=${description}&location=${location}&image=${image}`,
    formData,
    config
  );
};
export const AddStation = (event) => {
  return axios.post("api/stations", event);
};
export const DeleteStation = (id) => {
  return axios.delete(`api/stations/${id}`);
};

export const GetStations = () => {
  return axios.get("api/stations");
};

export const AddRoute = (startPoint, endPoint) => {
  const data = {
    startPoint,
    endPoint,
  };
  return axios.post("api/routes", data);
};
