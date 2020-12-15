import axios from 'axios'

const url = 'http://localhost:3000/api/'

export default {
  login (credentials) {
    return axios
      .post(url + 'login/', credentials)
      .then(response => response.data)
  },
  getUser (credentials) {
    return axios
      .post(url + 'get-user/', credentials)
      .then(response => response.data)
  },
  getUsers (credentials) {
    return axios
      .get(url + 'get-users/', credentials)
      .then(response => response.data)
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
