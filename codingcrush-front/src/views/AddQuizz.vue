<template>
  <div>
    <b-container>
      <b-col sm="4" align-self="center">
        <b-form-input placeholder="Nom du quiz" v-model="namequizz"></b-form-input>
      </b-col>
      <div v-for="index in count" :key="index">
        <AddQuestion />
      </div>
      <b-button v-on:click="addComponent">Ajouter une question</b-button>
      <b-button v-on:click="removeComponent"
        >Retirer la dernière question</b-button
      >
      <b-button v-on:click="create">Créer le quizz</b-button>
    </b-container>
  </div>
</template>

<script>
import AddQuestion from '../components/AddQuestion'
import AuthService from '@/services/AuthService.js'

export default {
  data () {
    return {
      count: 1,
      namequizz: ''
    }
  },
  async created () {
    // Si l'utilisateur n'est pas connecté
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    async create () {
      try {
        const credentials = {
          quizzname: this.namequizz,
          numberquestions: this.count,
          creatorid: this.$store.getters.getUser.id
        }
        this.$router.push('/profile')

        await AuthService.createQuizz(credentials)
      } catch (error) {
        this.msg = error.response.data.msg
      }
    },
    addComponent () {
      this.count++
    },
    removeComponent () {
      this.count--
    }
  },
  components: {
    AddQuestion
  }
}
</script>
