<template>
  <v-app>
    <router-view v-if='isLoggedIn || isPublicRoute'/>
    <Login v-else/>
  </v-app>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Login from './pages/Login/Login.vue';

@Component({
  components: { Login }
})
export default class App extends Vue {
  get isLoggedIn() {
    return this.$store.getters['auth/isLoggedIn']
  }

  get isPublicRoute() {
    return this.$route.meta.publicRoute;
  }

}
</script>

<style lang='scss'>
  @import './assets/styles/main.scss';
</style>
