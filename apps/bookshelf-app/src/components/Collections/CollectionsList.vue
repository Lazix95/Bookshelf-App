<template>
  <BasePageContent>
    <v-container>
      <v-row justify="center">
        <CollectionsListItem/>
      </v-row>
    </v-container>
  </BasePageContent>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import BasePageContent from '../Base/BasePageContent.vue';
import CollectionsListItem from './CollectionsListItem.vue';

@Component({
  components: { CollectionsListItem, BasePageContent },
  inheritAttrs: false,
})
export default class CollectionsList extends Vue {

}
</script>
