<template>
  <BasePageContent :loading="initLoading">
    <v-container>
      <v-row justify="center">
        <template v-for="book in books">
          <BookListItem
            :key="book.id"
            :name="book.name"
            :author="book.author"
            :publisher="book.publisher"
            :src="book.imageUrl"
            @goToBook="handleGoToBook(book.id)"
          />
        </template>
      </v-row>
    </v-container>
  </BasePageContent>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BookListItem from './BookListItem.vue';
import type { Book } from '../../store/modules/books/models';
import BasePageContent from '../Base/BasePageContent.vue';
@Component({
  inheritAttrs: false,
  components: { BasePageContent, BookListItem },
})
export default class BookList extends Vue {
  @Prop() readonly initLoading!: boolean;
  @Prop() readonly books!: Book[];

  protected handleGoToBook(bookID: string): void {
    this.$emit('goToBookDetails', bookID);
  }

  mounted(): void {
    this.$emit('fetchBooks');
  }
}
</script>
