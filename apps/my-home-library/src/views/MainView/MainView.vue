<template>
  <v-app id="inspire">

    <slot name='drawer' :active='drawerActive' @change='drawerActive = $event'>
      <DefaultDrawer v-model='drawerActive'/>
    </slot>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawerActive = !drawerActive"></v-app-bar-nav-icon>
      <v-toolbar-title>My Home Library</v-toolbar-title>
      <v-spacer/>
      <v-btn class='mr-0' icon>
        <v-icon large>account_circle</v-icon>
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
 }
</script>
