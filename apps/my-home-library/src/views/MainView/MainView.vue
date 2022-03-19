<template>
  <v-app id="inspire">

    <slot name='drawer' :active='drawerActive' @change='drawerActive = $event'>
      <DefaultDrawer v-model='drawerActive'/>
    </slot>

    <v-app-bar app height='67px'>
      <v-app-bar-nav-icon @click="drawerActive = !drawerActive"></v-app-bar-nav-icon>
      <v-toolbar-title> {{ pageTitle }} </v-toolbar-title>

      <v-btn v-if='showAddButton' class='ml-4' color='primary' elevation='2' icon :to='{name: "Books.add"}'>
        <v-icon medium>add</v-icon>
      </v-btn>

      <v-spacer/>

      <v-btn class='mr-0' icon @click='logout'>
        <v-icon large>power_settings_new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
     <slot/>
    </v-main>

  </v-app>
</template>

<script lang='ts'>
 import { Component, Vue } from 'vue-property-decorator'
 import DefaultDrawer from './Components/DefaultDrawer.vue';

 @Component({
   components: { DefaultDrawer }
 })
 export default class MainView extends Vue {
   private drawerActive = null;

   get pageTitle(): string {
     return this.$route.meta.title;
   }

   get showAddButton(): boolean {
     return this.$route.meta.add;
   }

   protected logout(): void {
     this.$store.dispatch('auth/logout')
   }
 }
</script>
