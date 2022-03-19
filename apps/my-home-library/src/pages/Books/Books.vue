<template>
 <router-view :submit-loading='submitLoading'
              :initLoading='initLoading'
              :books='books'
              :book='book'
              @fetchBooks='fetchBooks'
              @onSubmitBookForm='handleSubmitBookForm'
 />
</template>

<script lang='ts'>
import { Component, Watch } from 'vue-property-decorator';
import MainView from '../../views/MainView/MainView.vue';
import BookList from '../../components/Books/BookList.vue';
import { Book } from '../../store/modules/books/models';
import { BookApiPayload } from '../../api/books';
import { NavigationMixin } from '../../mixins/NavigationMixin';
import Vue from 'vue';

@Component({
  components: { BookList, MainView }
})
export default class Books extends NavigationMixin {
  protected submitLoading = false;
  protected initLoading = false;
  protected book: Book | null = null;

  get books(): Book[] {
    return this.$store.getters['books/books'];
  }

  get bookID(): number {
    return +this.$route.params.bookID;
  }

  @Watch('bookID', {
    immediate: true,
  })
  protected onBookIDChanged(bookID: number) {
    this.getBook(bookID);
  }

  protected getBook(bookID = this.bookID): void {
    if (!bookID) return;
    this.initLoading = true;
    this.$store.dispatch('books/getOneBook', { bookID }).then(book => {
      this.book = book;
      this.initLoading = false;
    }).catch(() => {
      Vue.$toast.error('Something went wrong, please try again later');
      this.goToHome();
    })
  }

  protected handleSubmitBookForm(payload: BookApiPayload): void {
    this.$store.dispatch('books/storeBook', payload);
  }

  protected fetchBooks(): void {
    this.initLoading = true;
    this.$store.dispatch('books/getBooks').then(() => {
      this.initLoading = false;
    });
  }
}
</script>
