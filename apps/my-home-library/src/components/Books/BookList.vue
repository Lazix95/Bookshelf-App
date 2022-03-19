<template>
<v-container>
  <v-row>
   <template v-for='book in books'>
     <BookListItem :key='book.id' :name='book.name' :author='book.author' :publisher='book.publisher' :src='book.src'/>
   </template>
  </v-row>
</v-container>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import BookListItem from './BookListItem.vue';
import { Book } from '../../store/modules/books/models';
@Component({
  inheritAttrs: false,
  components: { BookListItem }
})
export default class BookList extends Vue {
  @Prop() readonly books!: Book[];

  mounted(): void {
    this.$emit('fetchBooks');
  }
}
</script>
