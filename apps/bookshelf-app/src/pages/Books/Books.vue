<template>
  <router-view
    :key="$route.fullPath"
    :submit-loading="submitLoading"
    :initLoading="initLoading"
    :deleteLoading="deleteLoading"
    :books="books"
    :book="book"
    @fetchBooks="fetchBooks"
    @onSubmitBookForm="handleSubmitBookForm"
    @deleteBook="handleDeleteBook"
    @goToBookDetails="goToBookDetails"
    @goToBookEdit="goToBookEdit"
  />
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import MainView from '../../views/MainView/MainView.vue';
import BookList from '../../components/Books/BookList.vue';
import type { Book } from '../../store/modules/books/models';
import { BookApiPayload } from '../../api/books';
import { NavigationMixin } from '../../mixins/NavigationMixin';
import Vue from 'vue';

@Component({
  components: { BookList, MainView },
})
export default class Books extends NavigationMixin {
  protected submitLoading = false;
  protected initLoading = false;
  protected deleteLoading = false;

  protected book: Book | null = null;

  get books(): Book[] {
    return this.$store.getters['books/books'];
  }

  get bookID(): string {
    return this.$route.params.bookID;
  }

  @Watch('bookID', {
    immediate: true,
  })
  protected onBookIDChanged(bookID: string) {
    this.getBook(bookID);
  }

  protected getBook(bookID = this.bookID): void {
    if (!bookID) {
      this.book = null;
      return;
    }
    this.initLoading = true;
    this.$store
      .dispatch('books/getOneBook', { bookID })
      .then((book) => {
        this.book = book;
        this.initLoading = false;
      })
      .catch((err) => {
        if (err.response.status !== 422)
          Vue.$toast.error('Something went wrong, please try again later');
        this.initLoading = false;
        this.goToHome();
      });
  }

  protected handleSubmitBookForm(payload: BookApiPayload): void {
    this.submitLoading = true;
    this.$store
      .dispatch(
        payload.bookID ? 'books/updateBook' : 'books/storeBook',
        payload
      )
      .then(() => {
        this.submitLoading = false;
        this.goToHome();
      })
      .catch(() => {
        this.submitLoading = false;
      });
  }

  protected handleDeleteBook(bookID: string): void {
    this.deleteLoading = true;
    this.$store.dispatch('books/deleteBook', { bookID })
      .then(() => {
        this.deleteLoading = false;
      })
      .then(() => {
        this.deleteLoading = false;
      });
  }

  protected fetchBooks(): void {
    this.initLoading = true;
    this.$store.dispatch('books/getBooks').then(() => {
      this.initLoading = false;
    });
  }
}
</script>
