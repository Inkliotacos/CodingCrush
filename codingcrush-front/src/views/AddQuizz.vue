<template>
  <div>
    <b-container>
      <b-col sm="4" align-self="center">
        <b-form-input placeholder="Nom du quiz" v-model="namequizz"></b-form-input>
      </b-col>
      <div v-for="index in count" :key="index">
        <AddQuestion v-bind:countQ='index' v-on:inputChange="updateQuestions"/>
      </div>
      <p>{{ questions }}</p>
      <b-button v-on:click="addComponent">Ajouter une question</b-button>
      <b-button v-on:click="removeComponent"
        >Retirer la dernière question</b-button
      >
      <b-button v-on:click="create(); passQuestion()">Créer le quizz</b-button>
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
      namequizz: '',
      questions: []
    }
  },
  async created () {
    // Si l'utilisateur n'est pas connecté
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    updateQuestions (questionName, correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3) {
      this.questions.push(questionName, correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3)
    },
    async create () {
      try {
        const credentials = {
          quizzname: this.namequizz,
          numberquestions: this.count,
          creatorid: this.$store.getters.getUser.id
        }
        // this.$router.push('/profile')

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
