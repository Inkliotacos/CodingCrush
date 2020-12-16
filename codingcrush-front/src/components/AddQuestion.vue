<template>
  <div>
    <b-card style="max-width: 20rem" class="mb-2">
      <b-col sm="12" align-self="center">
        <b-form-input placeholder="Question"></b-form-input>
      </b-col>
        <b-col sm="12">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"
              ><b-icon-check2 class="text-success"></b-icon-check2
            ></span>
          </b-input-group-prepend>
          <b-form-input placeholder="Réponse correcte">
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
          <b-form-input placeholder="Réponse incorrecte">
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
          <b-form-input placeholder="Réponse incorrecte">
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
          <b-form-input placeholder="Réponse incorrecte">
          </b-form-input>
        </b-input-group>
      </b-col>
    </b-card>
  </div>
</template>
