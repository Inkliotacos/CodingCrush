<template>
<div class="container">
    <div class="row" style="justify-content: center;">
        <div class="col-sm-offset-4 col-sm-4">
    <div class="login-page">
        <form>
            <h3>Connexion</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Connexion</button>
        </form>
    </div>
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
