<template>
  <div>
    <b-container>
      <h1 class="text-center">Bonjour {{ username }} !</h1>
      <b-col sm="3">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"
              ><b-icon-search></b-icon-search
            ></span>
          </b-input-group-prepend>
          <b-form-input size="m" placeholder="Rechercher un crush">
          </b-form-input>
        </b-input-group>
      </b-col>
      <b-row cols-sm="5" cols-md="2">
        <b-col cols="12">
          <b-row cols-sm="5" cols-md="1">
            <h2 class="mt-3">Suggestion de profils</h2>
            <b-list-group>
              <div class="col" v-for="users in otherUsers" :key="users">
                <b-row class="text-center"
                  ><b-col
                    ><b-avatar
                      :src="users[0].profilimageurl"
                      :href="'/profile/' + users[0].id"
                      size="150px"
                    ></b-avatar>
                    <h4>{{ users[0].username }}</h4></b-col
                  ><b-col>
                    <b-avatar
                      :src="users[1].profilimageurl"
                      size="150px"
                      :href="'/profile/' + users[1].id"
                    ></b-avatar>
                    <h4>{{ users[1].username }}</h4></b-col
                  >
                </b-row>
                <b-row class="text-center">
                  <b-col
                    ><b-avatar
                      :src="users[2].profilimageurl"
                      size="150px"
                      :href="'/profile/' + users[2].id"
                    ></b-avatar>
                    <h4>{{ users[2].username }}</h4></b-col
                  ><b-col>
                    <b-avatar
                      :src="users[3].profilimageurl"
                      size="150px"
                      :href="'/profile/' + users[3].id"
                    ></b-avatar>
                    <h4>{{ users[3].username }}</h4></b-col
                  ></b-row
                >
              </div>
            </b-list-group>
          </b-row>
        </b-col>
        <b-col cols="6">
          <h2 class="mt-3">Derniers quizz</h2>
          <p>“Comment me connaître” par Esteban</p>
          <p>“Ceci est un quiz” par Esteban</p>
        </b-col>
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
