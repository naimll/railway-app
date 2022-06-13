import { axiosInstance as axios } from "./axiosInstance";

export const signUp = (name, lastname, email, password, role) => {
  const data = {
    name,
    lastname,
    email,
    password,
    role,
  };
  return axios.post("/api/v1/accounts/sign-up", data);
};

export const signIn = (email, password) => {
  const data = {
    email,
    password,
  };
  return axios.post("/api/v1/accounts/sign-in", data);
};

export const googleSignUp = (id, email, fullName, role) => {
  const data = {
    id,
    email,
    fullName,
    role,
  };

  return axios.post("/api/v1/accounts/google-sign-up", data);
};

export const googleSignIn = (id, email, name) => {
  const data = {
    id,
    email,
    name,
  };

  return axios.post("/api/v1/accounts/google-sign-in", data);
};
