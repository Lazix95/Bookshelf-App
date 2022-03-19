<template>
  <v-app>
    <component :is="view" v-if='(isLoggedIn || isPublicRoute) && !isAutoLoginLoading'>
      <router-view/>
    </component>
    <Login v-else-if='!isAutoLoginLoading'/>
    <Spinner v-else/>
  </v-app>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Login from './pages/Login/Login.vue';
import MainView from './views/MainView/MainView.vue';
import Spinner from './components/Spinner.vue';

@Component({
  components: { Spinner, MainView, Login }
})
export default class App extends Vue {
  protected isAutoLoginLoading = true;

  get isLoggedIn(): boolean {
    return this.$store.getters['auth/isLoggedIn']
  }

  get isPublicRoute(): boolean {
    return this.$route.meta.publicRoute;
  }

  get view(): string {
    const registeredViews = ['MainView']
    const view = this.$route.meta.view;
    const defaultView = registeredViews[0]
    if (!view) return defaultView;
    const isViewRegistered = registeredViews.includes(view);
    return isViewRegistered ? view : defaultView;
  }

  mounted(): void {
    this.$store.dispatch('auth/tryAutoLogin').then(() => {
      this.isAutoLoginLoading = false;
    }).catch(() => {
      this.isAutoLoginLoading= false;
    });
  }
}
</script>

<style lang='scss'>
  @import './assets/styles/main.scss';
</style>
