// src/views/Login.vue

<template>
  <div>
    <b-container>
      <h1>Se connecter</h1>
      <b-card bg-variant="light">
        <b-form>
          <label class="sr-only" for="login-username">Pseudo</label>
          <b-input-group prepend="@">
            <b-form-input
              id="login-username"
              placeholder="Pseudo"
              v-model="username"
            ></b-form-input>
          </b-input-group>

          <label class="sr-only" for="login-password">Mot de passe</label>
          <b-input-group>
            <b-form-input
              id="login-password"
              placeholder="Mot de passe"
              type="password"
              v-model="password"
            ></b-form-input>
          </b-input-group>

          <b-button variant="primary" @click="login">Se connecter</b-button>
        </b-form>
      </b-card>
      <p>
        Vous n’avez pas de compte ?
        <b-link to="/sign-up">Inscrivez-vous</b-link>
      </p>
      <b-alert show variant="warning" v-if="msg">{{ msg }}</b-alert>
    </b-container>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'

export default {
  data () {
    return {
      username: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    async login () {
      try {
        const credentials = {
          username: this.username,
          password: this.password
        }
        const response = await AuthService.login(credentials)
        this.msg = response.msg

        const token = response.token
        const user = response.user

        this.$store.dispatch('login', { token, user })

        this.$router.push('/')
      } catch (error) {
        this.msg = error.response.data.msg
      }
    }
  }
}
</script>
