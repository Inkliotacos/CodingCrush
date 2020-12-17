<template>
  <div>
    <b-container>
          <h1 class="text-center" @click="optionsNotShow">Bonjour {{ username }} !</h1>
      <b-col sm="4">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"
              ><b-icon-search></b-icon-search
            ></span>
          </b-input-group-prepend>
          <b-form-input
            size="m"
            @click="showOptions"
            class="dropdown-input"
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher un crush"
          >
          </b-form-input>
        </b-input-group>
        <div class="dropdown-content" v-show="optionsShown">
          <table v-if="allUsers.length" class="table">
            <tbody>
              <tr class="dropdown-item" v-for="user in resultQuery" :key="user">
                <p v-if="user.id !== id">
                <a @focus="showOptions"
                  class="list-item text-secondary"
                  :href="'/profile/' + user.id"
                  >{{ user.username }}</a
                ></p>
                <p v-else>
                <a @focus="showOptions"
                  class="list-item text-secondary"
                  :href="'/profile/'"
                  >{{ user.username }}</a
                ></p>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-container>
    <b-container @click="optionsNotShow">
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
                      href="/profile/"
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
                      href="/profile/"
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
                      href="/profile/"
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
                      href="/profile/"
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
            <a
              class="list-group-item text-secondary"
              :href="'/answerquizz/' + questions[0].quizzid"
              >{{ questions[0].question }} par {{ questions[0].username }}</a
            >
            <a
              class="list-group-item text-secondary"
              :href="'/answerquizz/' + questions[1].quizzid"
              >{{ questions[1].question }} par {{ questions[1].username }}</a
            >
            <a
              class="list-group-item text-secondary"
              :href="'/answerquizz/' + questions[2].quizzid"
              >{{ questions[2].question }} par {{ questions[1].username }}</a
            >
            <a
              class="list-group-item text-secondary"
              :href="'/answerquizz/' + questions[3].quizzid"
              >{{ questions[3].question }} par {{ questions[1].username }}</a
            >
            <a
              class="list-group-item text-secondary"
              :href="'/answerquizz/' + questions[4].quizzid"
              >{{ questions[4].question }} par {{ questions[1].username }}</a
            >
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
      lastQuestions: [],
      allUsers: [],
      searchQuery: null,
      optionsShown: false
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
    this.allUsers = await AuthService.getAllUsers()

    this.secretMessage = await AuthService.getSecretContent()
  },
  computed: {
    resultQuery () {
      if (this.searchQuery) {
        return this.allUsers.filter((user) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v) => user.username.toLowerCase().includes(v))
        })
      } else {
        return this.allUsers
      }
    }
  },
  methods: {
    showOptions () {
      if (!this.disabled) {
        this.optionsShown = true
      }
    },
    optionsNotShow () {
      this.optionsShown = false
    }
  }
}
</script>

<style scoped>
.dropdown-content {
  position: absolute;
  background-color: #fff;
  min-width: 295px;
  max-width: 288px;
  max-height: 248px;
  border: 1px solid #e7ecf5;
  box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
  overflow: auto;
  z-index: 1;
  right: 15px;
}
.dropdown:hover .dropdowncontent {
  display: block;
}
</style>
