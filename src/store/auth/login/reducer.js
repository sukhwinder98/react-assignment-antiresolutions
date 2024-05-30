import {
  LOGIN_USER,
  LOGIN_SUCCESS,
} from "./actionTypes"

const initialState = {
  error: "",
  user:"",
  loading: "",
  spinner: ""
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        spinner: true,
      }
      break

    case LOGIN_SUCCESS:
      state = {
        ...state,
        user:action.payload,
        loading: false,
        spinner: false
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
