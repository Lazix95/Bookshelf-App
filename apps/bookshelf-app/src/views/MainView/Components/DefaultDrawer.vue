<template>
  <v-navigation-drawer v-model="active" app>
    <v-list-item style="height: 67px">
      <v-list-item-content>
        <v-list-item-title class="text-h6"> My Bookshelf </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list nav>
      <v-list-item link :to="{name: 'Books'}">
        <v-list-item-content>
          <v-list-item-title>Books</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>Collections</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, VModel, Prop, Watch, Vue } from 'vue-property-decorator';
import { Author } from '../../../Models/author';

@Component
export default class DefaultDrawer extends Vue {
  private selectedAuthor = 0;

  @VModel({ type: Boolean, default: false }) active!: boolean;
}
</script>
