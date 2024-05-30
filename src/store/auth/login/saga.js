import { call, put, takeEvery } from "redux-saga/effects"
import qs from "qs"
import { LOGIN_USER } from "./actionTypes"
import { loginSuccess } from "./actions"
import {
  handleLogin,
} from "../../../helpers/backend_helper"
import { toast } from "react-toastify"

function* loginUser({ payload: { user, history } }) {
  try {
    
      var data = qs.stringify({
        username: user?.email,
        password: user?.password,
        expiresInMins: 30,
      })
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
      const response = yield call(handleLogin, data, config)
      if (response) {
        yield put(loginSuccess(response))
        let info = JSON.stringify(response?.data)
        localStorage.setItem("authUser", info)
        history.push("/dashboard")
      }
  } catch (error) {
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}


function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
}

export default authSaga
