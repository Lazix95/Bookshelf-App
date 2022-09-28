<template>
  <BookForm :init-loading="Books_initLoading" :submit-loading="Books_submitLoading" :book="Books_book" @onSubmitBookForm="Books_handleSubmitBookForm"/>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator"
import BookForm from '../../components/Books/BookForm.vue';
import { mixins } from 'vue-class-component';
import { StoreMixinBooks } from '../../mixins/StoreMixinBooks';
import { NavigationMixin } from '../../mixins/NavigationMixin';
import { AxiosError } from 'axios';

@Component({
  components: { BookForm },
  inheritAttrs: false,
})
export default class CtrBookForm extends mixins(StoreMixinBooks, NavigationMixin) {
  protected Books_onGetError() {
    this.goToHome();
  }

  protected Books_onSubmitSuccess() {
    this.$toast.success('Successfully Saved')
    this.goToHome();
  }
}
</script>
