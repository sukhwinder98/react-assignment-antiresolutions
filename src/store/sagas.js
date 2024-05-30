import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import LayoutSaga from "./layout/saga"
export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(LayoutSaga),
  ])
}
