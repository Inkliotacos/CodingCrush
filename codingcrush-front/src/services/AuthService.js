import axios from 'axios'

const url = 'http://localhost:8080/api/'

export default {
  login (credentials) {
    return axios
      .post(url + 'login/', credentials)
      .then(response => response.data)
  },
  getUser (credentials) {
    return axios
      .post(url + 'update-user/', credentials)
  },
  signUp (credentials) {
    return axios
      .post(url + 'sign-up/', credentials)
      .then(response => response.data)
  },
  updateProfile (credentials) {
    return axios
      .post(url + 'update-profile/', credentials)
      .then(response => response.data)
  },
  getSecretContent () {
    return axios.get(url + 'secret-route/').then(response => response.data)
  }
}
