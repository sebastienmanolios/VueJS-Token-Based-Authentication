import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
      // localStorage expects a string, not a object
      localStorage.setItem('user', JSON.stringify(userData))
      // We need to set the headers of our instance axios with that token from the user data
      // ---- We are just adding the token into the header ----- //
      // ---- So that when we make API calls, we have that token that the server can verify !!! ----
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    }
  }
})
