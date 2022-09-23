<template>
  <v-container fill-height fluid style="background-color: var(--background-poop)">
    <v-row justify="center">
      <v-col class="pt-0 text-center" cols="12" sm="6" md="5" lg="4" xl="3">
        <p class="title">Register  your account</p>
        <p class="subtitle">Please make sure all fields are filled in correctly.</p>

        <v-divider class="pb-5 mt-3"></v-divider>

        <v-form ref='form'>
          <v-text-field dense v-model="firstName" outlined label="First Name" :rules='firstNameRules'/>
          <v-text-field dense v-model="lastName" outlined label="Last Name" :rules='lastNameRules' />
          <v-text-field dense v-model="email" outlined label="E-mail" :rules='emailRules' />
          <v-text-field type="password" dense v-model="password" outlined label="Password" :rules='passwordRules' />
          <v-text-field type="password" dense v-model="confirmPassword" outlined label="Confirm Password" :rules="[(value) => value === password || `Confirm Password must be same as Password`]" />

          <v-btn :loading="submitLoading" width="100%" color="primary" @click="onSignUp">
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterApiPayload } from '../../api/auth';
import { RegisterErrors } from './RegisterPageTypes';
import {
  ruleAtLeastOneNumber,
  ruleAtLeastOneUppercase,
  ruleEmailRequiredAndValid,
  ruleFieldRequiredMinMax, ruleSameAsField
} from '../../validation-rules/text-validations';

@Component
export default class Login extends Vue {
  private firstName = '';
  private lastName = '';
  private email = '';
  private password = '';
  private confirmPassword = '';
  private submitLoading = false;
  private errors: RegisterErrors = {};

  private firstNameRules = ruleFieldRequiredMinMax('First Name', 3, 50);
  private lastNameRules = ruleFieldRequiredMinMax('Last Name', 3, 50);
  private emailRules = ruleEmailRequiredAndValid();
  private passwordRules = [...ruleFieldRequiredMinMax('Password', 6, 50), ...ruleAtLeastOneUppercase('Password'), ...ruleAtLeastOneNumber('password')];
  get confirmPasswordRules(): unknown {
    return ruleSameAsField
  }

  clearErrors(): void {
    this.errors = {};
  }

  validate () {
    const form = this.$refs.form as any;
    if (this.$refs.form) return form.validate();
    return false;
  }

  onSignUp(): void {
    console.log(this.validate());
    return
    this.clearErrors();
    const payload: RegisterApiPayload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    this.submitLoading = true;
    this.$store.dispatch('auth/register', payload).then(() => {
        this.submitLoading = false;
        this.$router.push({ name: 'Books.vue' });
      }).catch(() => {
        //if (err.response.data.validationMessages) this.errors = err.response.data.validationMessages;
        this.submitLoading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 17px;
  margin-bottom: 6px;
  color: #000000;
  font-weight: bold;
}
.subtitle {
  margin-bottom: 0;
  font-size: 14px;
  color: #000000;
}
</style>
