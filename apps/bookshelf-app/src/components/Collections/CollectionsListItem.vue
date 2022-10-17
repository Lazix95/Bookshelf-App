<template>
  <v-col cols="12" sm="6" md="4" lg="3" xl="2">
    <div class="c-book__list-item p-relative text-center">
<!--      <v-img v-if="src" aspect-ratio='3/4' class="ma-auto" width='200px' :lazy-src="src" :src="src"/>-->
      <BookNoCover/>
      <BaseTitle class='u-grayscale-80 u-font-semi-bold' :level='2' :value="'Unknown Collection'"/>
    </div>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import BookNoCover from '../Books/BookNoCover.vue';
import BaseTitle from '../Base/BaseTitle.vue';
import BaseText from '../Base/BaseText.vue';

@Component({
  components: { BaseText, BaseTitle, BookNoCover },
  inheritAttrs: false,
})
export default class CollectionsListItem extends Vue {

}
</script>

<style lang="scss" scoped>
 @import "./../../assets/styles/components/book";
</style>
