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
          <b-row>
          <h1 style="margin: 12px"> {{ username }} </h1>
           <span class="input-group-text">
          <b-icon-heart-fill style="margin-right: 8px"></b-icon-heart-fill>
          <h3> {{ compat }} %</h3>
            </span>
            </b-row>
          <h2> {{ firstname}} {{ lastname }}</h2>
          <p>
            {{ descriptionUser }}
          </p>
            <b-button @click="sendCrush()">Envoyer un crush !</b-button>
            <b-textarea name="message" v-model="crushMessage" placeholder="Un  petit message pour votre crush 😏"></b-textarea>
            <p>Il vous reste {{ crushdispo }} crushs que vous pouvez envoyer.</p>
            <b-alert show variant="warning" v-if="msg">{{ msg }}</b-alert>
          <a :href="facebookLink" v-if="facebookLink.length" target="_blank">
            <img
              width="30px"
              src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-facebook-1.png&r=0&g=0&b=0"
            /> </a
          ><a :href="instagramLink" v-if="instagramLink.length" target="_blank">
            <img
              width="30px"
              src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2016/png/iconmonstr-instagram-11.png&r=0&g=0&b=0"
            /> </a
          ><a :href="twitterLink" v-if="twitterLink.length" target="_blank"
            ><img
              width="30px"
              src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-twitter-1.png&r=0&g=0&b=0"
            /> </a
          ><a :href="steamLink" v-if="steamLink.length" target="_blank"
            ><img
              width="30px"
              src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2014/png/iconmonstr-steam-3.png&r=0&g=0&b=0"
            />
          </a>
            <b-button @click="sendCrush()">Envoyer un crush !</b-button>
            <b-textarea name="message" v-model="crushMessage" placeholder="Un  petit message pour votre crush 😏"></b-textarea>
            <p>Il vous reste {{ crushdispo }} crushs que vous pouvez envoyer.</p>
            <b-alert show variant="warning" v-if="msg">{{ msg }}</b-alert>
            <b-icon icon="facebook"></b-icon>
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
import CompatibilityService from '@/services/CompatibilityService.js'
import emailjs from 'emailjs-com'

export default {
  data () {
    return {
      idVisitor: this.$store.getters.getUser.id,
      username: '',
      lastname: '',
      mail: '',
      firstname: '',
      mail: '',
      urlImage: '',
      descriptionUser: '',
      crushMessage: '',
      post: null,
      visitedId: this.$route.params.id,
      compat: '?',
      facebookLink: '',
      instagramLink: '',
      twitterLink: '',
      steamLink: '',
      msg: '',
      creatorId: '',
      crushList: {},
      questionsUser: [],
      msg: '',
      crushdispo: 0
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
    dateFormat (date) {
      date = date.split('T')[0]
      date = date.replaceAll('-', '/')
      return date
    },
    async getUser () {
      try {
        const credentials = {
          idUser: this.visitedId
        }
        const response = await AuthService.getUser(credentials)
        this.questionsUser = await AuthService.getQuestionProfile(credentials)
        console.log(this.questionsUser)

        this.msg = response.msg
        const user = response.user

        this.username = user.username
        this.lastname = user.lastname
        this.mail = user.mail
        this.firstname = user.firstname
        this.mail = user.mail
        this.urlImage = user.profilimageurl
        this.descriptionUser = user.descriptionUser
        this.facebookLink = user.facebooklink
        this.instagramLink = user.instagramlink
        this.twitterLink = user.twitterlink
        this.steamLink = user.steamlink
        this.descriptionUser = user.descriptionUser
        this.crushdispo = user.crushdisponible
        this.getReceiveCrush()
      } catch (error) {
        // this.msg = error.response.data.msg
      }
    },
    async loadCompat () {
      try {
        var tabId = [this.$route.params.id, this.$store.getters.getUser.id]
        tabId.sort()
        const credentials = {
          idFirstUser: tabId[0],
          idSecondUser: tabId[1]
        }
        const response = await AuthService.getCompat(credentials)
        // this.msg = response.msg

        const resultCompat = response.compat

        // console.log(response)
        if (resultCompat) {
          this.compat = resultCompat.value
          // console.log(this.compat)
        } else {
          const credentials1 = {
            idUser: tabId[0]
          }
          const response1 = await AuthService.getUser(credentials1)
          const user1 = response1.user

          const credentials2 = {
            idUser: tabId[1]
          }
          const response2 = await AuthService.getUser(credentials2)
          const user2 = response2.user

          const compatibility = CompatibilityService.calculCompat(user1, user2)
          console.log(compatibility)
          this.compat = compatibility
          const compatCredentials = {
            idFirstUser: tabId[0],
            idSecondUser: tabId[1],
            value: compatibility
          }
          console.log(compatCredentials)
          await AuthService.updateCompat(compatCredentials)
        }
      } catch (error) {
        // this.msg = error.response.data.msg
      }
    },
    async sendCrush () {
      try {
        const credentials = {
          idRecipient: this.visitedId,
          idSender: this.$store.getters.getUser.id,
          message: this.crushMessage
        }
        const response = await AuthService.sendCrush(credentials)

        this.msg = response.msg
      } catch (error) {
        // this.msg = error.response.data.msg
      }
    },
    async getReceiveCrush () {
      try {
        const credentials = {
          idUser: this.visitedId
        }
        const response = await AuthService.getCrushReceive(credentials)
        const crushsList = response.crushs
        this.crushList = crushsList
      } catch (error) {
        // this.msg = error.response.data.msg
      }
    },
    sendEmail: (e) => {
      emailjs.sendForm('service_mextk2d', 'template_76uj0h9', e.target, this.mail)
        .then((result) => {
          console.log('SUCCESS!', result.status, result.text)
        }, (error) => {
          console.log('FAILED...', error)
        })
    }
  },
  mounted () {
    this.getUser()
    this.loadCompat()
  }
}

</script>
