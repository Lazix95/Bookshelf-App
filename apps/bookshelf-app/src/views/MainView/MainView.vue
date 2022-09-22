<template>
  <v-app id="inspire">
    <slot name="drawer" :active="drawerActive" @change="drawerActive = $event">
      <DefaultDrawer v-model="drawerActive" />
    </slot>

    <v-app-bar app height="67px">
      <v-app-bar-nav-icon
        @click="drawerActive = !drawerActive"
      ></v-app-bar-nav-icon>
      <v-toolbar-title> {{ pageTitle }} </v-toolbar-title>

      <v-btn v-if="showAddButton" class="ml-4" color="primary" elevation="2" icon :to="{ name: 'Books.add' }">
        <v-icon medium>add</v-icon>
      </v-btn>

      <v-btn v-if="showEditButton" class="ml-4" color="primary" elevation="2" icon @click='handleEditClick'>
        <v-icon medium>edit</v-icon>
      </v-btn>

      <v-btn v-if="showDeleteButton" class="ml-4" color="red" elevation="2" icon @click='handleDeleteClick'>
        <v-icon medium >delete_outline</v-icon>
      </v-btn>

      <v-spacer />

      <v-btn class="mr-0" icon @click="logout">
        <v-icon large>power_settings_new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { throwHeaderEditEvent, throwHeaderDeleteEvent } from '../../event-busses/HeaderBus';
import DefaultDrawer from './Components/DefaultDrawer.vue';

@Component({
  components: { DefaultDrawer },
})
export default class MainView extends Vue {
  private drawerActive = null;

  get routeMeta(): Record<string, unknown> {
    return this.$route.meta || {};
  }

  get pageTitle(): string {
    return this.routeMeta.title as string;
  }

  get showAddButton(): boolean {
    return !!this.routeMeta.add;
  }

  get showEditButton(): boolean {
    return !!this.routeMeta.edit;
  }

  get showDeleteButton(): boolean {
    return !!this.routeMeta.delete;
  }

  protected logout(): void {
    this.$store.dispatch('auth/logout');
  }

  protected handleEditClick(): void {
    throwHeaderEditEvent();
  }

  protected handleDeleteClick(): void {
    throwHeaderDeleteEvent();
  }
}
</script>
