<template>
  <v-navigation-drawer v-model="active" app color=''>
    <v-container fluid class='pt-0'>
      <v-row>
        <v-col class='pb-0'>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Authors
              </v-list-item-title>
              <v-list-item-subtitle>
                And Publishers
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col align-self='center' align='end' class='pb-0'>
          <v-btn color='primary' elevation='2' icon>
            <v-icon medium>add</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-divider/>

    <v-list dense nav>

      <v-list-item>
        <v-row>
          <v-col class='pt-0'>
            <v-autocomplete v-model='selectedAuthor' placeholder='All' :auto-select-first='true' clearable :items="authorsDropdownList"/>
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider/>

      <v-list-item link class='mt-1'>
        <v-list-item-content>
          <v-list-item-title>Tomas Haris</v-list-item-title>
          <v-list-item-subtitle>
            Laguna
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>J.R.R. Tolkin</v-list-item-title>
          <v-list-item-subtitle>
            Vulkan
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script lang='ts'>
  import { Component, VModel, Prop, Watch, Vue } from 'vue-property-decorator'
  import { Author } from '../../../Models/author';

  @Component
  export default class DefaultDrawer extends Vue {

    private selectedAuthor = 0;

    @VModel({type: Boolean, default: false}) active!: boolean;

    @Prop({ type: Array, default: () => [] }) authors!: Author[];

    // Getters
    get authorsDropdownList() {
      return this.authors.map((author: Author) => ({ text: author.name, value: author.id }));
    }
  }
</script>

<style scoped>
  /deep/ .v-navigation-drawer__content {
  /*background-color: var(--grayscale-05);*/
}

</style>
