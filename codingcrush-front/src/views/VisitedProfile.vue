<template>
  <div>
    <b-container>
      <div class="header row mt-3">
        <div class="col-2">
          <b-avatar
            :src="urlImage"
            size="auto"
          ></b-avatar>
        </div>
        <b-col>
          <h1> {{ username }} </h1> <h3> {{ compat }} %</h3>
          <p>
            {{ descriptionUser }}
          </p>
          <b-button @click="sendEmail">Envoyer un crush !</b-button>
          <b-textarea name="message" v-model="crushMessage" placeholder="Un  petit message pour votre crush 😏"></b-textarea>
            <b-icon icon="facebook"></b-icon>
        </b-col>
      </div>
      <b-row cols-sm="1" cols-md="2">
        <div class="col-6">
          <h2 class="mt-3">Crushs</h2>

          <b-list-group>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar class="mr-3"></b-avatar>
              <p>Ipsum duis est non exercitation.</p>
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar class="mr-3"></b-avatar>
              <p>Magna veniam deserunt exercitation quis nostrud enim exercitation.</p>
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar class="mr-3"></b-avatar>
              <p>Laboris eiusmod eu ea id est qui officia reprehenderit ea ipsum proident.</p>
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar class="mr-3"></b-avatar>
              <p>Magna adipisicing esse ut anim consectetur dolore eiusmod reprehenderit nostrud occaecat qui.</p>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col-6">
          <h2 class="mt-3">Quizz</h2>
        </div>
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
      urlImage: '',
      descriptionUser: '',
      crushMessage: '',
      post: null,
      visitedId: this.$route.params.id,
      compat: '?',
      facebookLink: '',
      instagramLink: '',
      twitterLink: '',
      steamLink: ''
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
    async getUser () {
      try {
        const credentials = {
          idUser: this.visitedId
        }
        const response = await AuthService.getUser(credentials)

        this.msg = response.msg
        const user = response.user

        this.username = user.username
        this.lastname = user.lastname
        this.mail = user.mail
        this.urlImage = user.profilimageurl
        this.descriptionUser = user.descriptionUser
        this.facebookLink = user.facebooklink
        this.instagramLink = user.instagramlink
        this.twitterLink = user.twitterlink
        this.steamLink = user.steamlink
        this.descriptionUser = user.descriptionUser
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
