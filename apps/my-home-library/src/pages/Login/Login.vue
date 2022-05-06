<template>
    <v-container fill-height fluid style='background-color: var(--background-poop)'>
      <v-row justify='center'>
        <v-col class='pt-0 text-center' cols='12' sm='6' md='5' lg='4' xl='3'>
          <p class='title'>Sing in to your library</p>
          <p class='subtitle'>Please enter your email and password</p>
          <v-divider class='pb-5 mt-3'></v-divider>
          <v-text-field dense v-model='email' outlined label='E-mail'/>
          <v-text-field type='password' dense hide-details v-model='password' outlined label='Password' @keyup.enter='onLogin'/>
          <v-checkbox label='Remember Me' hide-details v-model='rememberMe'/>
          <v-subheader light class='black--text'> You dont have an account, <router-link class='ml-1' :to='{ name: "register" }'>Register Here!</router-link> </v-subheader>
          <v-btn :loading='submitLoading' width='100%' color='primary' @click='onLogin'>Login</v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  private email = '';
  private password = '';
  private rememberMe = false;
  private submitLoading = false

  onLogin(): void {
    const payload = {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    }

    this.submitLoading = true;
    this.$store.dispatch('auth/login', payload).then(() => {
      this.submitLoading = false;
    }).catch(() => {
      this.submitLoading = false;
    })
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
