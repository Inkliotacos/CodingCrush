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
            <div class="col" v-for="users in otherUsers" :key="users">
              <b-avatar :src="users[0].profilimageurl" :href="'/profile/' + users[0].id" size="200px"></b-avatar>
              <h4>{{ users[0].username }}</h4>
              <b-avatar :src="users[1].profilimageurl" size="200px" :href="'/profile/' + users[1].id"></b-avatar>
              <h4>{{ users[1].username }}</h4>
              <b-avatar :src="users[2].profilimageurl" size="200px" :href="'/profile/' + users[2].id"></b-avatar>
              <h4>{{ users[2].username }}</h4>
              <b-avatar :src="users[3].profilimageurl" size="200px" :href="'/profile/' + users[3].id"></b-avatar>
              <h4>{{ users[3].username }}</h4>
            </div>
          </b-list-group>
                </b-row>
        </div>
        <div class="col-4">
          <h2 class="mt-3">Derniers quizz</h2>
          <p>“Comment me connaître” par Esteban</p>
          <p>“Ceci est un quiz” par Esteban</p>
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
      otherUsers: []
    }
  },
  async created () {
    // Si l'utilisateur n'est pas connecté
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login')
    }

    this.username = this.$store.getters.getUser.username
    this.urlImage = this.$store.getters.getUser.profilimageurl
    this.otherUsers = await AuthService.getUsers()

    console.log(this.otherUsers.users)

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
