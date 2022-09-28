<template>
  <v-app>
    <!-- If route is PUBLIC and user is not logged in, view cannot be "MainView" -->
    <component :is="view" v-if="(isLoggedIn || isPublicRoute) && !isAutoLoginLoading">
      <router-view />
    </component>
    <Login v-else-if="!isAutoLoginLoading" />
    <WidgetSpinner v-else />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Login from './pages/Login/Login.vue';
import MainView from './views/MainView/MainView.vue';
import WidgetSpinner from './components/widgets/WidgetSpinner.vue';
import EmptyView from './views/EmptyView/EmptyView.vue';

@Component({
  components: { EmptyView, WidgetSpinner, MainView, Login },
})
export default class App extends Vue {
  protected isAutoLoginLoading = true;

  get isLoggedIn(): boolean {
    return this.$store.getters['auth/isLoggedIn'];
  }

  get isPublicRoute(): boolean {
    return this.$route.meta?.publicRoute;
  }

  get view(): string {
    const registeredViews = ['MainView', 'EmptyView'];
    const view = this.$route.meta?.view;
    const defaultView = registeredViews[0];
    if (!view) return defaultView;
    const isViewRegistered = registeredViews.includes(view);
    return isViewRegistered ? view : defaultView;
  }

  protected mounted(): void {
    this.$store
      .dispatch('auth/tryAutoLogin')
      .then(() => {
        setTimeout(() => {
          this.isAutoLoginLoading = false;
        }, 250)
      })
      .catch(() => {
        setTimeout(() => {
          this.isAutoLoginLoading = false;
        }, 250)
      });
  }
}
</script>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
