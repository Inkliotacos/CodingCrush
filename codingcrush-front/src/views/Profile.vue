<template>
  <div>
    <b-container>
      <div class="header row mt-3">
        <div class="col-2">
          <b-avatar
            :src="urlImage"
            size="130px"
          ></b-avatar>
        </div>
        <b-col>
          <h1> {{ username }} </h1>
          <p>
            {{ descriptionUser }}
          </p>
          <b-button style="margin-right: 2%" href="/editprofile">Modifier le profil</b-button>
          <b-button href="/addquizz">Ajouter un quizz</b-button>

        </b-col>
      </div>
      <b-row cols-sm="1" cols-md="2">
        <div class="col-6">

          <h2 class="mt-3">Crushs reçus</h2>
          <b-list-group>
            <b-list-group-item class="d-flex align-items-center" v-for="crush in crushList" :key="crush">
              <b-avatar class="mr-3"></b-avatar>
              <p>{{crush.message}} [{{dateFormat(crush.date)}}]</p>
            </b-list-group-item>
          </b-list-group>

          <h2 class="mt-3">Crushs envoyés</h2>
          <b-list-group>
            <b-list-group-item class="d-flex align-items-center" v-for="crush in crushSendList" :key="crush" style= "justify-content: space-between;">
              <b-col style="display: flex; flex : 3">
                <b-row style= "display: flex; ">
                  <b-avatar class="mr-3" :src="crush.profilimageurl" :href="'/profile/'+crush.idRecipient"></b-avatar>
                  <p>{{crush.message}} [{{dateFormat(crush.date)}}]</p>
                </b-row>
              </b-col>
              <b-col style="padding : 0; display: flex; flex : 1" >
                <b-button @click="deleteCrush(crush.crushId)">Supprimer</b-button>
              </b-col>
            </b-list-group-item>
          </b-list-group>

        </div>
          <b-col class="col-6">
          <h2 class="mt-3">Quizz</h2>
            <b-col v-for="questions in questionsUser" :key="questions">
              <a class="list-group-item text-secondary" :href="'/answerquizz/' + questions.id">{{ questions.question }}</a>
            </b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      secretMessage: '',
      username: '',
      lastname: '',
      urlImage: '',
      descriptionUser: '',
      crushList: {},
      crushSendList: {},
      questionsUser: []
      crushList: {},
      crushSendList: {}
    }
  },
  async created () {
    // Si l'utilisateur n'est pas connecté
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login')
    }

    this.username = ''
    this.lastname = ''
    this.urlImage = ''
    this.descriptionUser = ''

    this.secretMessage = await AuthService.getSecretContent()
  },
  methods: {
    dateFormat (date) {
      date = date.split('T')[0]
      date = date.replaceAll('-', '/')
      return date
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    async getUser () {
      try {
        const credentials = {
          idUser: this.$store.getters.getUser.id
        }
        const response = await AuthService.getUser(credentials)
        this.questionsUser = await AuthService.getQuestionProfile(credentials)

        this.msg = response.msg

        const user = response.user

        this.username = user.username
        this.lastname = user.lastname
        this.urlImage = user.profilimageurl
        this.descriptionUser = user.descriptionUser

        this.getReceiveCrush()
        this.getSendCrush()
      } catch (error) {
        // this.msg = error.response.data.msg
      }
    },
    async getReceiveCrush () {
      try {
        const credentials = {
          idUser: this.$store.getters.getUser.id
        }
        const response = await AuthService.getCrushReceive(credentials)
        const crushsList = response.crushs
        this.crushList = crushsList
      } catch (error) {
        // this.msg = error.response.data.msg
      }
    },
    async getSendCrush () {
      try {
        const credentials = {
          idUser: this.$store.getters.getUser.id
        }
        const response = await AuthService.getCrushSend(credentials)
        const crushsList = response.crushs
        this.crushSendList = crushsList
      } catch (error) {
        // this.msg = error.response.data.msg
      }
    },
    async deleteCrush (crushId) {
      const credentials = {
        idCrush: crushId
      }
      await AuthService.deleteCrush(credentials)
      this.getSendCrush()
    }
  },
  mounted () {
    this.getUser()
  },
  computed: {
    ...mapState({
      userBis: state => state.user
    })
  }
}

</script>
