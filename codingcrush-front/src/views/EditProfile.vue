<template>
  <div>
    <b-container>
      <b-form>
                <label class="sr-only" for="edit-profilimage">Username</label>
          <b-input-group>
            <b-form-input
              id="edit-username"
              placeholder="Choissi ton nouveau nom"
              v-model="username"
            ></b-form-input>
          </b-input-group>

        <label class="sr-only" for="edit-profilimage">Image</label>
          <b-input-group>
            <b-form-input
              id="edit-profilimage"
              placeholder="URL image de profil"
              type = "url"
              v-model="urlImage"
            ></b-form-input>
          </b-input-group>

        <label class="sr-only" for="edit-description">Description</label>
          <b-input-group>
            <b-textarea
              id="edit-description"
              placeholder="Decrivez-vous"
              v-model="userDescription"
            > {{ userDescription }} </b-textarea>
          </b-input-group>

          <label class="sr-only" for="edit-facebookLink">Lien Facebook</label>
          <b-input-group>
            <b-textarea
              id="edit-facebookLink"
              placeholder="Lien facebook"
              v-model="facebookLink"
            > {{ facebookLink }} </b-textarea>
          </b-input-group>

          <label class="sr-only" for="edit-instagramLink">Lien Instagram</label>
          <b-input-group>
            <b-textarea
              id="edit-instagramLink"
              placeholder="Lien Instagram"
              v-model="instagramLink"
            > {{ instagramLink }} </b-textarea>
          </b-input-group>

          <label class="sr-only" for="edit-twitterLink">Lien Twitter</label>
          <b-input-group>
            <b-textarea
              id="edit-twitterLink"
              placeholder="Lien Twitter"
              v-model="twitterLink"
            > {{ twitterLink }} </b-textarea>
          </b-input-group>

          <label class="sr-only" for="edit-steamLink">Lien Steam</label>
          <b-input-group>
            <b-textarea
              id="edit-steamLink"
              placeholder="Lien Steam"
              v-model="steamLink"
            > {{ steamLink }} </b-textarea>
          </b-input-group>

        <b-button variant="primary" @click="update">Mettre à jour</b-button>
      </b-form>
      <b-alert show variant="warning" v-if="msg">{{ msg }}</b-alert>
    </b-container>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'

export default {
  data () {
    return {
      username: this.$store.getters.getUser.username,
      urlImage: this.$store.getters.getUser.profilimageurl,
      userDescription: this.$store.getters.getUser.descriptionUser,
      msg: '',
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

    this.username = this.$store.getters.getUser.username
    this.urlImage = this.$store.getters.getUser.profilimageurl
    this.userDescription = this.$store.getters.getUser.descriptionUser
    this.secretMessage = await AuthService.getSecretContent()
  },
  methods: {
    async update () {
      try {
        const credentials = {
          username: this.username,
          profilimage: this.urlImage,
          description: this.userDescription,
          idUser: this.$store.getters.getUser.id,
          facebookLink: this.facebookLink,
          instagramLink: this.instagramLink,
          twitterLink: this.twitterLink,
          steamLink: this.steamLink
        }
        this.$router.push('/profile')

        const response = await AuthService.updateProfile(credentials)

        this.msg = response.msg

        // const token = response.token
        const user = response.user

        this.$store.commit('SET_USER', user)
        // dispatch('login', { token, user })
      } catch (error) {
        this.msg = error.response.data.msg
      }
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
        this.userDescription = user.descriptionUser
        this.facebookLink = user.facebooklink
        this.instagramLink = user.instagramlink
        this.twitterLink = user.twitterlink
        this.steamLink = user.steamlink
      } catch (error) {
        // this.msg = error.response.data.msg
      }
    }
  },
  mounted () {
    this.getUser()
  }
}
</script>
