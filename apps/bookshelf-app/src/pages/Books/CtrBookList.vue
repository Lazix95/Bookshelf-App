<template>
  <BookList :books="Books_books" :init-loading="Books_initLoading" @goToBookDetails="goToBookDetails"/>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator"
import BookList from '../../components/Books/BookList.vue';
import { mixins } from 'vue-class-component';
import { StoreMixinBooks } from '../../mixins/StoreMixinBooks';
import { NavigationMixin } from '../../mixins/NavigationMixin';

@Component({
  components: { BookList },
  inheritAttrs: false,
})
export default class CtrBookList extends mixins(StoreMixinBooks, NavigationMixin) {
  protected mounted(): void {
    this.Books_getAllBooks();
  }
}
</script>
