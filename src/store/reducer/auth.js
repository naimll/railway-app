import * as actionType from "../actions/actionType";

const initialState = {
  id: 1,
  name: null,
  lastname: null,
  email: null,
  role: null,
  token: null,
  isAuthenticated: false,
};

const login = (state, action) => {
  localStorage.setItem("token", action.token);
  console.log(state);
  return {
    ...state,
    id: action.id,
    name: action.name,
    lastname: action.lastname,
    email: action.email,
    role: action.role,
    token: action.token,
    isAuthenticated: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return login(state, action);
    default:
      return state;
  }
};
export default reducer;
