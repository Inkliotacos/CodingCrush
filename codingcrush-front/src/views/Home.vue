<template>
  <div>
    <b-container>
      <h1 class="text-center">Bonjour {{ username }} !</h1>
      <b-col sm="4">
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
                  ><b-col v-if="id !== users[0].id"
                    ><b-avatar
                      :src="users[0].profilimageurl"
                      :href="'/profile/' + users[0].id"
                      size="150px"
                    ></b-avatar>
                    <h4>{{ users[0].username }}</h4></b-col
                  >
                  <b-col v-else>
                    <b-avatar
                      :src="users[0].profilimageurl"
                      :href="/profile/"
                      size="150px"
                    ></b-avatar>
                    <h4>{{ users[0].username }}</h4></b-col
                  >
                  <b-col v-if="id !== users[1].id"
                    ><b-avatar
                      :src="users[1].profilimageurl"
                      :href="'/profile/' + users[1].id"
                      size="150px"
                    ></b-avatar>
                    <h4>{{ users[1].username }}</h4></b-col
                  >
                  <b-col v-else>
                    <b-avatar
                      :src="users[1].profilimageurl"
                      :href="/profile/"
                      size="150px"
                    ></b-avatar>
                    <h4>{{ users[1].username }}</h4></b-col
                  >
                </b-row>
                <b-row class="text-center">
                  <b-col v-if="id != users[2].id"
                    ><b-avatar
                      :src="users[2].profilimageurl"
                      :href="'/profile/' + users[2].id"
                      size="150px"
                    ></b-avatar>
                    <h4>{{ users[2].username }}</h4></b-col
                  >
                  <b-col v-else>
                    <b-avatar
                      :src="users[2].profilimageurl"
                      :href="/profile/"
                      size="150px"
                    ></b-avatar>
                    <h4>{{ users[2].username }}</h4></b-col
                  >
                  <b-col v-if="id != users[3].id"
                    ><b-avatar
                      :src="users[3].profilimageurl"
                      :href="'/profile/' + users[3].id"
                      size="150px"
                    ></b-avatar>
                    <h4>{{ users[3].username }}</h4></b-col
                  >
                  <b-col v-else>
                    <b-avatar
                      :src="users[3].profilimageurl"
                      :href="/profile/"
                      size="150px"
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
          <b-col v-for="questions in lastQuestions" :key="questions">
            <p>{{ questions[0].question }} par {{ questions[0]}}</p>
          </b-col>
        </b-col>
      </b-row>
      <p>{{ secretMessage }}</p>
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
      id: '',
      otherUsers: [],
      lastQuestions: []
    }
  },
  async created () {
    // Si l'utilisateur n'est pas connecté
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login')
    }

    this.username = this.$store.getters.getUser.username
    this.urlImage = this.$store.getters.getUser.profilimageurl
    this.id = this.$store.getters.getUser.id
    this.otherUsers = await AuthService.getUsers()
    this.lastQuestions = await AuthService.getQuestions()

    console.log(this.lastQuestions)

    this.secretMessage = await AuthService.getSecretContent()
  }
}
</script>
