<template>
  <BookDetails :initLoading="Books_initLoading" :deleteLoading="Books_deleteLoading" :book="Books_book" @deleteBook="handleDeleteBook"/>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator"
import BookDetails from '../../components/Books/BookDetails.vue';
import { mixins } from 'vue-class-component';
import { NavigationMixin } from '../../mixins/NavigationMixin';
import { StoreMixinBooks } from '../../mixins/StoreMixinBooks';
import { AxiosError } from 'axios';

@Component({
  components: { BookDetails },
  inheritAttrs: false,
})
export default class CtrBookDetails extends mixins(NavigationMixin, StoreMixinBooks) {
  protected Books_onGetError(error: AxiosError) {
    this.goToHome();
  }

  protected Books_onDeleteSuccess(bookID: string) {
    this.goToHome();
  }
}
</script>
