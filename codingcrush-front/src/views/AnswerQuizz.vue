<template>
  <div>
    <b-container>
      <b-card style="max-width: 20rem" class="mb-2">
        <h2 class="mt-3">{{ question }}</h2>
        <b-form-group>
      <b-form-radio-group v-model="selected" stacked>
        <b-form-radio :value="incorrectAnswer1" >{{incorrectAnswer1}}</b-form-radio>
        <b-form-radio :value="incorrectAnswer3">{{incorrectAnswer3}}</b-form-radio>
        <b-form-radio :value="correctAnswer">{{correctAnswer}}</b-form-radio>
        <b-form-radio :value="incorrectAnswer2">{{incorrectAnswer2}}</b-form-radio>
      </b-form-radio-group>
        </b-form-group>
        <b-button @click="answerQuizz">Valider</b-button>
        <b-alert show variant="warning" v-if="msg">{{ msg }}</b-alert>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'

export default {
  data () {
    return {
      quizzId: this.$route.params.id,
      question: '',
      correctAnswer: '',
      incorrectAnswer1: '',
      incorrectAnswer2: '',
      incorrectAnswer3: '',
      selected: '',
      msg: ''
    }
  },
  async created () {
    // Si l'utilisateur n'est pas connecté
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login')
    }

    this.secretMessage = await AuthService.getSecretContent()
  },
  methods: {
    answerQuizz () {
      if (this.selected === '') {
        this.msg = 'Selectionne un truc ou je te frappe.'
      } else
      if (this.selected === this.correctAnswer) {
        this.msg = 'Bravo ! Tu as réussi !'
      } else {
        this.msg = 'Tu es une merde.'
      }
    },
    async getQuestion () {
      try {
        const credentials = {
          idQuizz: this.quizzId
        }
        const response = await AuthService.getQuestion(credentials)
        console.log(this.quizzId)
        this.msg = response.msg
        const quizz = response.quizz

        this.question = quizz.question
        this.correctAnswer = quizz.correctanswer
        this.incorrectAnswer1 = quizz.incorrectanswer1
        this.incorrectAnswer2 = quizz.incorrectanswer2
        this.incorrectAnswer3 = quizz.incorrectanswer3
        console.log(this.correctAnswer)
      } catch (error) {
        // this.msg = error.response.data.msg
      }
    }
  },
  mounted () {
    this.getQuestion()
  }
}
</script>
