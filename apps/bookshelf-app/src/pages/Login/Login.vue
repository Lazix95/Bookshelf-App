<template>
  <v-container fill-height fluid style="background-color: var(--background-poop)">
    <v-row justify="center">
      <v-col class="pt-0 text-center" cols="12" sm="6" md="5" lg="4" xl="3">
        <BaseTitle level="2">Sing in to your library</BaseTitle>
        <BaseText size="14">Please enter your email and password</BaseText>
        <v-divider class="pb-5 mt-3"></v-divider>
        <BaseTextField v-model="email" label="E-mail" />
        <BaseTextField type="password" hide-details v-model="password" label="Password" @keyup.enter="onLogin"/>

        <BaseCheckbox label="Remember Me" v-model="rememberMe"/>
        <BaseBtn :loading="submitLoading" width="100%" color="primary" @click="onLogin" text="Login"/>

        <v-divider class="pb-3 mt-3"></v-divider>

        <WidgetTextWithLink align="center" class="mb-5 ml-5">
          <template v-slot:textOne>You dont have an account,</template>
          <template v-slot:link>
            <router-link class="ml-1" :to="{ name: 'register' }">Register Here!</router-link>
          </template>
        </WidgetTextWithLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseTitle from '../../components/Base/BaseTitle.vue';
import BaseText from '../../components/Base/BaseText.vue';
import BaseTextField from '../../components/Base/BaseTextField.vue';
import BaseBtn from '../../components/Base/BaseBtn.vue';
import WidgetTextWithLink from '../../components/widgets/WidgetTextWithLink.vue';
import BaseCheckbox from '../../components/Base/BaseCheckbox.vue';
@Component({
  components: { BaseCheckbox, WidgetTextWithLink, BaseBtn, BaseTextField, BaseText, BaseTitle }
})
export default class Login extends Vue {
  private email = '';
  private password = '';
  private rememberMe = false;
  private submitLoading = false;

  onLogin(): void {
    const payload = {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    };

    this.submitLoading = true;
    this.$store
      .dispatch('auth/login', payload)
      .then(() => {
        this.submitLoading = false;
      })
      .catch(() => {
        this.submitLoading = false;
      });
  }
}
</script>
