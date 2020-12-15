<template>
  <div>
    <b-container>
      <h1>Bonjour {{ username }} !</h1>
      <b-form-input
        size="10%"
        class="mr-sm-2"
        placeholder="Rechercher"
      ></b-form-input>
      <b-icon-search></b-icon-search>
      <b-row cols-sm="5" cols-md="2">
        <div class="col-8">
                <b-row cols-sm="5" cols-md="1">
          <h2 class="mt-3">Suggestion de profils</h2>
          <b-list-group>
            <div class="col">
            <b-avatar :src="urlImage" size="200px"></b-avatar>
            <h4>Nom 1</h4>
            <b-avatar :src="urlImage" size="200px"></b-avatar>
            <h4>Nom 2</h4>
            </div>
             <div class="col">
            <b-avatar :src="urlImage" size="200px"></b-avatar>
            <h4>Nom 3</h4>
            <b-avatar :src="urlImage" size="200px"></b-avatar>
            <h4>Nom 4</h4>
            </div>
          </b-list-group>
                </b-row>
        </div>
        <div class="col-4">
          <h2 class="mt-3">Derniers quizz</h2>
          <p>“Comment me connaître” par Esteban</p>
          <p>“Ceci est un quiz” par Esteban</p>
          <p>All users : {{ otherUsers }}</p>
        </div>
      </b-row>
      <p>{{ secretMessage }}</p>
      <input type="button" value="Logout" @click="logout" />
    </b-container>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'

export default {
  data () {
    return {
      secretMessage: '',
      username: '',
      urlImage: '',
      otherUsers: ''
    }
  },
  async created () {
    // Si l'utilisateur n'est pas connecté
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login')
    }

    this.username = this.$store.getters.getUser.username
    this.urlImage = this.$store.getters.getUser.profilimageurl
    this.otherUsers = this.$store.getters.getUsers

    console.log('Users : ' + this.$store.getters.getUsers)

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
