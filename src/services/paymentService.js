import axios from "./axiosPayment";


export const postPayment = () => {
    return axios.post("/payment");
};