<template>
  <div class="NoCoverAvailable d-flex text-center ma-auto">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <span>No Cover Available</span>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component({
   inheritAttrs: false,
})
export default class BookNoCover extends Vue {

}
</script>

<style lang='scss' scoped>
.NoCoverAvailable {
  aspect-ratio: 3 / 4;
  width: 200px;
  border: 8px solid var(--transparent-05);
  border-radius: 20px !important;
  span {
    color: var(--transparent-10);
    font-family: cursive;
  }
}
</style>
