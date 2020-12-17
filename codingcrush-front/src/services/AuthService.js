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

  getAllUsers (credentials) {
    return axios
      .post(url + 'get-all-users/', credentials)
      .then(response => response.data.users)
  },

  updateCompat (credentials) {
    return axios
      .post(url + 'update-compat/', credentials)
      .then(response => response.data)
  },

  getCompat (credentials) {
    return axios
      .post(url + 'get-compatibility/', credentials)
      .then(response => response.data)
  },

  /*
  updateUser (credentials) {
    return axios
      .post(url + 'update-user/', credentials)
      .then(response => response.data)
  },
*/

  getUsers (credentials) {
    return axios
      .post(url + 'get-users/', credentials)
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
  createQuizz (credentials) {
    return axios
      .post(url + 'add-quizz/', credentials)
      .then(response => response.data)
  },
  createQuestion (credentials) {
    return axios
      .post(url + 'add-question/', credentials)
      .then(response => response.data)
  },
  getQuestions (credentials) {
    return axios
      .post(url + 'get-questions/', credentials)
      .then(response => response.data)
  },
  getQuestion (credentials) {
    return axios
      .post(url + 'get-question/', credentials)
      .then(response => response.data)
  },

  sendCrush (credentials) {
    return axios
      .post(url + 'add-crush/', credentials)
      .then(response => response.data)
  },

  getCrushSend (credentials) {
    return axios
      .post(url + 'get-crush-send/', credentials)
      .then(response => response.data)
  },

  getCrushReceive (credentials) {
    return axios
      .post(url + 'get-crush-receive/', credentials)
      .then(response => response.data)
  },

  deleteCrush (credentials) {
    return axios
      .post(url + 'delete-crush/', credentials)
      .then(response => response.data)
  },

  getSecretContent () {
    return axios.get(url + 'secret-route/').then(response => response.data)
  }
}
