<template>
  <BasePageContent :loading="initLoading" class="BookForm">
    <template v-slot:title>
      <v-col class='text-center mb-3'>
        <BaseTitle :value='book.name'/>
      </v-col>
    </template>

    <v-row justify="center">
      <v-col cols="6" class="pa-3">
        <v-img v-if="book && book.imageUrl" style="width: 255px" class="BookForm--img p-relative" :src="book.imageUrl"/>
        <BookNoCover class="mr-0" v-else/>
      </v-col>

      <v-col v-if='book' cols="12" md="6">
        <v-row class='ma-0 pa-0'>
          <v-col cols='12'>
            <BaseText class='u-font-18 u-font-semi-bold' value='Author:' :br='true'/>
            <BaseText :value='book.author'/>
          </v-col>

          <v-col cols="12" md="4">
            <BaseText class='u-font-18 u-font-semi-bold' value='Publisher:' :br='true'/>
            <BaseText :value='book.publisher'/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </BasePageContent>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import type { Book } from '../../store/modules/books/models';
import BasePageContent from '../Base/BasePageContent.vue';
import BaseTitle from '../Base/BaseTitle.vue';
import BaseText from '../Base/BaseText.vue';
import BookNoCover from './BookNoCover.vue';

@Component({
  inheritAttrs: false,
  components: {
    BookNoCover,
    BaseText,
    BaseTitle,
    BasePageContent,
    Cropper,
  },
})
export default class AddNewBookForm extends Vue {
  @Prop() readonly submitLoading!: boolean;
  @Prop() readonly initLoading!: boolean;
  @Prop() readonly book!: Book;
}
</script>

<style lang="scss" scoped>
.BookForm {
  &--img {
    margin: auto 0 auto auto;
  }
}
</style>
