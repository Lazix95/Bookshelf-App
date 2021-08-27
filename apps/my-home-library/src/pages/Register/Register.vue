<template>
  <v-container fill-height fluid style='background-color: var(--background-poop)'>
    <v-row justify='center'>
      <v-col class='pt-0 text-center' cols='12' sm='6' md='5' lg='4' xl='3'>
        <p class='title'>Sing in to your library</p>
        <p class='subtitle'>Please enter your email and password</p>
        <v-divider class='pb-5 mt-3'></v-divider>
        <v-text-field dense v-model='firstName' outlined label='First Name'/>
        <v-text-field dense v-model='lastName' outlined label='Last Name'/>
        <v-text-field dense v-model='email' outlined label='E-mail'/>
        <v-text-field type='password' dense v-model='password' outlined label='Password'/>
        <v-text-field type='password' dense v-model='confirmPassword' outlined label='Confirm Password'/>
        <v-btn width='100%' color='primary' @click='onSignUp'>Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { RegisterApiPayload } from '../../api/auth';

@Component
export default class Login extends Vue {
  private firstName = '';
  private lastName = '';
  private email = '';
  private password = '';
  private confirmPassword = '';

  onSignUp() {
    const payload: RegisterApiPayload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    }

    this.$store.dispatch('auth/register', payload);
  }

}
</script>

<style lang='scss' scoped>
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
