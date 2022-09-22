<template>
  <BasePageContent :loading="initLoading" :title='(book || {}).name || ""' :full-screen='true'>

    <template v-slot:button>
      <WidgetDropdownMenu/>
    </template>

    <v-row justify="center" class='mt-3'>
      <v-col cols="6" class="pa-3">
        <v-img v-if="book && book.imageUrl" style="width: 255px" class="ma-auto mr-0" :src="book.imageUrl"/>
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

    <WidgetConfirmDeleteDialog
      ref="confirmDialog"
      @confirm="handleDeleteBook"
    />
  </BasePageContent>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import type { Book } from '../../store/modules/books/models';
import BasePageContent from '../Base/BasePageContent.vue';
import BaseTitle from '../Base/BaseTitle.vue';
import BaseText from '../Base/BaseText.vue';
import BookNoCover from './BookNoCover.vue';
import WidgetDropdownMenu from '../widgets/WidgetDropdownMenu.vue';
import { DELETE_HEADER_BUTTON_CLICKED, EDIT_HEADER_BUTTON_CLICKED, headerEventBus } from '../../event-busses/HeaderBus';
import WidgetConfirmDeleteDialog, { WidgetConfirmDeleteDialogRef } from '../widgets/WidgetConfirmDeleteDialog.vue';

@Component({
  inheritAttrs: false,
  components: {
    WidgetConfirmDeleteDialog,
    WidgetDropdownMenu,
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

  protected handleEditButton(): void {
    this.$emit('goToBookEdit', this.book.id)
  }

  protected confirmDelete(): void {
    const confirmDialog = this.$refs.confirmDialog as WidgetConfirmDeleteDialogRef;

    const message = `Are you sure you want to delete <strong>${this.book.name}</strong> by <strong>${this.book.author}</strong> ?`;
    confirmDialog.open({ prop: this.book.id, message });
  }

  protected handleDeleteBook(bookID: string): void {
    this.$emit('deleteBook', bookID);
  }

  protected startListeners(): void {
    headerEventBus.$on(EDIT_HEADER_BUTTON_CLICKED, this.handleEditButton);
    headerEventBus.$on(DELETE_HEADER_BUTTON_CLICKED, this.confirmDelete);
  }

  protected endListeners(): void {
    headerEventBus.$off(EDIT_HEADER_BUTTON_CLICKED, this.handleEditButton);
    headerEventBus.$off(DELETE_HEADER_BUTTON_CLICKED, this.confirmDelete);
  }

  protected mounted(): void {
    this.startListeners();
  }

  protected destroyed(): void {
    this.endListeners();
  }
}
</script>

<style lang="scss" scoped>
</style>
