<template>
  <v-container
    fill-height
    fluid
    style="background-color: var(--background-poop)"
  >
    <v-row justify="center">
      <v-col class="pt-0 text-center" cols="12" sm="6" md="5" lg="4" xl="3">
        <p class="title">Sing in to your library</p>
        <p class="subtitle">Please enter your email and password</p>
        <v-divider class="pb-5 mt-3"></v-divider>
        <v-text-field
          dense
          v-model="firstName"
          outlined
          label="First Name"
          :error-messages="errors.firstName"
        />
        <v-text-field
          dense
          v-model="lastName"
          outlined
          label="Last Name"
          :error-messages="errors.lastName"
        />
        <v-text-field
          dense
          v-model="email"
          outlined
          label="E-mail"
          :error-messages="errors.email"
        />
        <v-text-field
          type="password"
          dense
          v-model="password"
          outlined
          label="Password"
          :error-messages="errors.password"
        />
        <v-text-field
          type="password"
          dense
          v-model="confirmPassword"
          outlined
          label="Confirm Password"
          :error-messages="errors.confirmPassword"
        />
        <v-btn
          :loading="submitLoading"
          width="100%"
          color="primary"
          @click="onSignUp"
          >Submit</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterApiPayload } from '../../api/auth';
import { RegisterErrors } from './RegisterPageTypes';

@Component
export default class Login extends Vue {
  private firstName = '';
  private lastName = '';
  private email = '';
  private password = '';
  private confirmPassword = '';
  private submitLoading = false;
  private errors: RegisterErrors = {};

  clearErrors(): void {
    this.errors = {};
  }

  onSignUp(): void {
    this.clearErrors();
    const payload: RegisterApiPayload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    this.submitLoading = true;
    this.$store
      .dispatch('auth/register', payload)
      .then(() => {
        this.submitLoading = false;
        this.$router.push({ name: 'Books.vue' });
      })
      .catch((err) => {
        console.log('err => ');
        if (err.response.data.validationMessages)
          this.errors = err.response.data.validationMessages;
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
