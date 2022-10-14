<template>
  <CollectionsList/>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import CollectionsList from '../../components/Collections/CollectionsList.vue';

@Component({
  components: { CollectionsList },
  inheritAttrs: false,
})
export default class CtrCollections extends Vue {

}
</script>
