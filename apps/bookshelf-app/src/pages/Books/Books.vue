<template>
  <router-view
    :key="$route.fullPath"
    :submit-loading="Books_submitLoading"
    :delete-loading="Books_deleteLoading"
    :initLoading="Books_initLoading"
    :deleteLoading="Books_deleteLoading"
    :books="Books_books"
    :book="Books_book"
    @fetchBooks="Books_getAllBooks"
    @onSubmitBookForm="handleSubmitBookForm"
    @deleteBook="handleDeleteBook"
    @goToBookDetails="goToBookDetails"
    @goToBookEdit="goToBookEdit"
  />
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import MainView from '../../views/MainView/MainView.vue';
import BookList from '../../components/Books/BookList.vue';
import { NavigationMixin } from '../../mixins/NavigationMixin';
import { StoreMixinBooks } from '../../mixins/StoreMixinBooks';
import { AxiosError } from 'axios';

@Component({
  components: { BookList, MainView },
})
export default class Books extends mixins(NavigationMixin, StoreMixinBooks) {
  protected Books_onGetError(error: AxiosError) {
    this.goToHome();
  }

  protected Books_onSubmitSuccess() {
    this.$toast.success('Successfully Saved')
    this.goToHome();
  }

  protected Books_onDeleteSuccess(bookID: string) {
    this.goToHome();
  }
}
</script>
