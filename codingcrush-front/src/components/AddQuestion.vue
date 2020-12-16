<template>
  <div>
    <b-card style="max-width: 20rem" class="mb-2">
      <b-col sm="12" align-self="center">
        <b-form-input placeholder="Question" v-model="questionsinfos.question" v-on:input="(questionName) => this.$emit('inputChange', questionName)"></b-form-input>
      </b-col>
        <b-col sm="12">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"
              ><b-icon-check2 class="text-success"></b-icon-check2
            ></span>
          </b-input-group-prepend>
          <b-form-input placeholder="Réponse correcte" v-model="correctanswer" v-on:input="(correctAnswer) => this.$emit('inputChange', correctAnswer)">
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
          <b-form-input placeholder="Réponse incorrecte" v-on:input="(incorrectAnswer1) => this.$emit('inputChange', incorrectAnswer1)">
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
          <b-form-input placeholder="Réponse incorrecte" v-on:input="(incorrectAnswer2) => this.$emit('inputChange', incorrectAnswer2)">
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
          <b-form-input placeholder="Réponse incorrecte" v-on:input="(incorrectAnswer3) => this.$emit('inputChange', incorrectAnswer3)">
          </b-form-input>
        </b-input-group>
      </b-col>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      questionsinfos: {}
    }
  },
  props: ['countQ']
}
</script>
