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
          <h1> {{ username }} </h1>
          <p>
            {{ descriptionUser }}
          </p>
          <b-button href="/editprofile">Modifier le profil</b-button>
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      secretMessage: '',
      username: '',
      lastname: '',
      urlImage: '',
      descriptionUser: ''
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

        this.msg = response.msg

        const user = response.user

        this.username = user.username
        this.lastname = user.lastname
        this.urlImage = user.profilimageurl
        this.descriptionUser = user.descriptionUser
      } catch (error) {
        // this.msg = error.response.data.msg
      }
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
