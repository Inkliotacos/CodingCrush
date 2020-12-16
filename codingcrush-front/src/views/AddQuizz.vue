<template>
  <div>
    <b-container>
    <b-card style="max-width: 20rem" class="mb-2">
      <b-col sm="12" align-self="center">
        <b-form-input placeholder="Question" v-model="questions.name"></b-form-input>
      </b-col>
        <b-col sm="12">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"
              ><b-icon-check2 class="text-success"></b-icon-check2
            ></span>
          </b-input-group-prepend>
          <b-form-input placeholder="Réponse correcte" v-model="questions.correctAnswer">
          </b-form-input>
        </b-input-group>
      </b-col>
      <b-col sm="12">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"
              ><b-icon-x class="text-danger"></b-icon-x
            ></span>
          </b-input-group-prepend>
          <b-form-input placeholder="Réponse incorrecte" v-model="questions.incorrectAnswer1">
          </b-form-input>
        </b-input-group>
      </b-col>
      <b-col sm="12">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"
              ><b-icon-x class="text-danger"></b-icon-x
            ></span>
          </b-input-group-prepend>
          <b-form-input placeholder="Réponse incorrecte" v-model="questions.incorrectAnswer2">
          </b-form-input>
        </b-input-group>
      </b-col>
      <b-col sm="12">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"
              ><b-icon-x class="text-danger"></b-icon-x
            ></span>
          </b-input-group-prepend>
          <b-form-input placeholder="Réponse incorrecte" v-model="questions.incorrectAnswer3">
          </b-form-input>
        </b-input-group>
      </b-col>
    </b-card>
      <b-button @click="createQuestion">Créer la question</b-button>
    </b-container>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'

export default {
  data () {
    return {
      count: 1,
      questions: {}
    }
  },
  async created () {
    // Si l'utilisateur n'est pas connecté
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    async createQuestion () {
      try {
        const credentials = {
          question: this.questions.name,
          correctAnswer: this.questions.correctAnswer,
          incorrectAnswer1: this.questions.incorrectAnswer1,
          incorrectAnswer2: this.questions.incorrectAnswer2,
          incorrectAnswer3: this.questions.incorrectAnswer3,
          creatorid: this.$store.getters.getUser.id
        }
        this.$router.push('/profile')

        await AuthService.createQuestion(credentials)
      } catch (error) {
        this.msg = error.response.data.msg
      }
    }
    /* async create () {
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
    } */
  }
}
</script>
