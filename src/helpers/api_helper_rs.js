import axios from "axios"
import qs from "qs"
import { toast } from "react-toastify"
const API_URL = process.env.REACT_APP_API_HOST

const axiosApi = axios.create({
  baseURL: API_URL,
})
axiosApi.defaults.withCredentials = true

axios.interceptors.request.use(function (config) {
  const auth = JSON.parse(localStorage.getItem("authUser"))
  let token = auth?.token
  if (token) {
    config["headers"]["common"]["Authorization"] = `Bearer ${token}`
  }
  return config
})

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function getNew(url, config = {}) {
  var config = {
    method: "GET",
    url: `${API_URL}${url}`,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    params: {
      ...config?.params,
    },
  }
  return axios(config).catch(error => {
    if (error?.response?.status === 401 || error?.response?.status === 500) {
      if (error?.response?.status === 401) {
        toast.error("Login session expired", {
          position: toast.POSITION.TOP_RIGHT,
        })
        window.location.href = "/login"
        localStorage.clear()
        sessionExpired()
      }
      throw error
    }
  })
}

export async function postNew(url, data, config = {}) {
  var config = {
    method: "POST",
    url: `${API_URL}${url}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
    data: data,
    params: {
      ...config?.params,
    },
  }
  return axios(config).catch(error => {
    throw error
  })
}

export async function put(url, data, config = {}) {
  var config = {
    method: "PUT",
    url: `${API_URL}${url}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
    data: data,
    params: {
      ...config?.params,
    },
  }
  return axios(config).catch(error => {
    throw error
  })
}

export async function del(url, data, config = {}) {
  var config = {
    method: "DELETE",
    url: `${API_URL}${url}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
    data: data,
    params: {
      ...config?.params,
    },
  }
  return axios(config).catch(error => {
    throw error
  })
}

// For GET requests
const requestHelper = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

requestHelper.interceptors.request.use(
  req => {
    const token = localStorage.getItem("authUser")
    req.headers["Authorization"] = token
    return req
  },
  err => {
    return Promise.reject(err)
  }
)
// For POST requests
requestHelper.interceptors.response.use(
  res => {
    if (res.status === 201 || res.status === 200) {
    }
    return res
  },
  err => {
    return Promise.reject(err)
  }
)

export default requestHelper
