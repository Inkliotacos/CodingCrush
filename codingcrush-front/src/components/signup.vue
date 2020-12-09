<template>
    <div class="container">
    <div class="row" style="justify-content: center;">
        <div class="col-sm-offset-4 col-sm-4">
        <form>
            <h3>Inscription</h3>

            <div class="form-group">
                <label>Prénom</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>

            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Inscription</button>

            <p class="forgot-password text-right">
                Tu as déjà un compte?
                <router-link :to="{name: 'login'}">connecte toi !</router-link>
            </p>
        </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
