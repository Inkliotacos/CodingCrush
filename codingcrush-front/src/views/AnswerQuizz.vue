<template>
  <div>
    <b-container>
      <b-card style="max-width: 30rem; margin-top: 10%" class="mx-auto">
        <h2 class="mt-3 card-header">{{ question }}</h2>
        <b-form-group>
      <b-form-radio-group v-model="selected" stacked>
        <li class="list-group-item"><b-form-radio :value="incorrectAnswer1" >{{incorrectAnswer1}}</b-form-radio></li>
        <li class="list-group-item"><b-form-radio :value="incorrectAnswer3">{{incorrectAnswer3}}</b-form-radio></li>
        <li class="list-group-item"><b-form-radio :value="correctAnswer">{{correctAnswer}}</b-form-radio></li>
        <li class="list-group-item"><b-form-radio :value="incorrectAnswer2">{{incorrectAnswer2}}</b-form-radio></li>
      </b-form-radio-group>
        </b-form-group>
         <div class="text-center">
        <b-button @click="answerQuizz">Valider</b-button>
         </div>
      </b-card>
      <b-alert show variant="warning" v-if="msg">{{ msg }}</b-alert>
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
        this.msg = response.msg
        const quizz = response.quizz

        this.question = quizz.question
        this.correctAnswer = quizz.correctanswer
        this.incorrectAnswer1 = quizz.incorrectanswer1
        this.incorrectAnswer2 = quizz.incorrectanswer2
        this.incorrectAnswer3 = quizz.incorrectanswer3
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
