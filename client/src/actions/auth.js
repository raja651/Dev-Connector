import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAILURE } from "./types";
import { setAlert } from "./alert";

//Register user
export const register = ({ name, email, password }) => async dispatch => {
  const newUser = {
    name,
    email,
    password
  };
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify(newUser);
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAILURE
    });
  }
};
