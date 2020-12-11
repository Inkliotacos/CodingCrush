// src/views/SignUp.vue

<template>
  <div>
    <b-container>
      <h1>S'inscrire</h1>
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

          <label class="sr-only" for="login-lastname">Nom</label>
          <b-input-group>
            <b-form-input
              id="login-lastname"
              placeholder="Nom"
              v-model="lastname"
            ></b-form-input>
          </b-input-group>

          <label class="sr-only" for="login-birthdate">Date de naissance</label>
          <b-input-group>
            <b-form-input
              id="login-birthdate"
              placeholder="Année de naissance"
              type="date"
              v-model="birthdate"
            ></b-form-input>
          </b-input-group>

          <label class="sr-only" for="login-profilimage">Nom</label>
          <b-input-group>
            <b-form-input
              id="login-profilimage"
              placeholder="URL image de profil"
              v-model="profilimage"
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

          <label class="sr-only" for="login-password-check">Mot de passe</label>
          <b-input-group>
            <b-form-input
              id="login-password-check"
              placeholder="Vérification du mot de passe"
              type="password"
              v-model="password_repeat"
            ></b-form-input>
          </b-input-group>

          <b-button variant="primary" @click="signUp">S'inscrire</b-button>
        </b-form>
      </b-card>
      <p>
        Vous avez déja un compte ?
        <b-link to="/login">Connectez-vous</b-link>
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
      lastname: '',
      birthdate: '',
      profilimage: '',
      password: '',
      password_repeat: '',
      msg: ''
    }
  },
  methods: {
    async signUp () {
      try {
        const credentials = {
          username: this.username,
          lastname: this.lastname,
          birthdate: this.birthdate,
          profilimage: this.profilimage,
          password: this.password,
          password_repeat: this.password_repeat
        }
        const response = await AuthService.signUp(credentials)
        this.msg = response.msg
      } catch (error) {
        this.msg = error.response.data.msg
      }
    }
  }
}
</script>
