<template>
  <div>
    <h1>Bonjour {{ username }} !</h1>
    <p>{{ secretMessage }}</p>
    <img :src="urlImage">
    <input type="button" value="Logout" @click="logout" />
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'

export default {
  data () {
    return {
      secretMessage: '',
      username: '',
      urlImage: ''
    }
  },
  async created () {
    // Si l'utilisateur n'est pas connecté
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login')
    }

    this.username = this.$store.getters.getUser.username
    this.urlImage = this.$store.getters.getUser.profilimageurl

    this.secretMessage = await AuthService.getSecretContent()
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
