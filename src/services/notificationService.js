import { HubConnectionBuilder } from "@microsoft/signalr";
import { axiosNotification as axios } from "./axiosNotification";

export const connect = (accessToken) => {
  console.log(accessToken);
  return new HubConnectionBuilder()
    .withUrl(`https://localhost:44326/hubs/notification`, {
      accessTokenFactory: () => accessToken,
    })
    .withAutomaticReconnect()
    .build();
};

export const connectToUser = (accessToken, userId) => {
  console.log(typeof userId);

  return new HubConnectionBuilder()
    .withUrl(
      `https://localhost:44326/hubs/notificationUserHub?userId=${userId}`,
      {
        accessTokenFactory: () => accessToken,
      }
    )
    .withAutomaticReconnect()
    .build();
};
export const getUserNotification = () => {
  return axios.get("/api/v1/notification/get-user-notification");
};
