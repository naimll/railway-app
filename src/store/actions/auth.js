import * as actionType from "./actionType";

export const login = (id, name, lastname, email, role, token) => ({
  type: actionType.LOGIN,
  id,
  name,
  lastname,
  email,
  role,
  token,
});
