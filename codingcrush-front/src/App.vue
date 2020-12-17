<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Coding Crush</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Accueil</b-nav-item>
            <b-nav-item to="/about" >A propos</b-nav-item>
            <b-nav-item to="/login" v-if="!this.$store.getters.isLoggedIn">Se connecter</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
                  <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em> <b-icon icon="person-fill"></b-icon> Mon compte</em>
              </template>
              <b-dropdown-item href="/profile">Mon profil</b-dropdown-item>
              <b-dropdown-item href="#" @click="logout"> Se déconnecter <b-icon icon="power" aria-hidden="true"></b-icon></b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view/>
  </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
