<template>
  <BasePageContent
    :loading="initLoading"
    class="BookForm"
    :title="isEditMode ? 'Update Your Book' : 'Add Your New Book'"
  >
    <v-row justify="center">
      <v-col
        v-if="!changeImage && book && book.imageUrl"
        cols="auto"
        md="auto"
        class="text-center u-border-all pa-3"
      >
        <v-img
          style="width: 255px"
          class="BookForm--img p-relative"
          :src="book.imageUrl"
        >
          <!--            <div class='d-flex align-center justify-center p-absolute wh-100 BookForm&#45;&#45;img-overlay'>-->
          <!--              <v-btn color='red' elevation='2' @click='changeImage = true'>-->
          <!--                Change/Delete-->
          <!--                <br/>-->
          <!--                Image-->
          <!--              </v-btn>-->
          <!--            </div>-->
        </v-img>

        <v-btn
          class="mt-3"
          color="primary"
          elevation="2"
          icon
          @click="changeImage = true"
        >
          <v-icon medium>delete</v-icon>
        </v-btn>
      </v-col>

      <v-col v-if="imageSrc" cols="12" md="4">
        <Cropper
          ref="cropper"
          :src="imageSrc"
          @change="onImageCrop"
          :stencil-props="{
            aspectRatio: 3 / 4,
          }"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field label="Name" v-model="name" />
        <v-text-field label="Author" v-model="author" />
        <v-text-field label="Publisher" v-model="publisher" />
        <v-file-input
          v-if="!book || !book.imageUrl || changeImage"
          v-model="image"
          label="Cover Image"
          append-icon="photo_camera"
          prepend-icon=""
          @change="onImageUploaded"
        />
        <v-btn
          class="mt-5"
          :loading="submitLoading"
          width="100%"
          color="primary"
          @click="onSubmit"
          >Submit</v-btn
        >
      </v-col>
    </v-row>
  </BasePageContent>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import type { Book } from '../../store/modules/books/models';
import BasePageContent from '../base/BasePageContent.vue';

@Component({
  inheritAttrs: false,
  components: {
    BasePageContent,
    Cropper,
  },
})
export default class AddNewBookForm extends Vue {
  @Prop() readonly submitLoading!: boolean;
  @Prop() readonly initLoading!: boolean;
  @Prop() readonly book!: Book;

  protected image = null;
  protected imageSrc = '';
  protected name = '';
  protected author = '';
  protected publisher = '';
  protected imageBlob: unknown = null;
  protected changeImage = false;

  get isEditMode(): boolean {
    return !!this.book?.id;
  }

  @Watch('book', {
    immediate: true,
  })
  protected onBookLoaded(): void {
    if (!this.book) return;
    this.name = this.book.name;
    this.author = this.book.author;
    this.publisher = this.book.publisher;
  }

  protected onImageCrop({ canvas }: { canvas: HTMLCanvasElement }): void {
    canvas.toBlob((a) => {
      const image = this.image as unknown as { name: string };
      this.imageBlob = a;
      (this.imageBlob as { name: string }).name = image.name;
    });
  }

  protected onImageUploaded(file: File): void {
    if (!file) {
      this.imageSrc = '';
      return;
    }
    this.imageSrc = URL.createObjectURL(file);
  }

  protected onSubmit(): void {
    console.log(this.image, this.imageBlob);
    let payload = {
      ...(this.book && { bookID: this.book.id }),
      name: this.name,
      author: this.author,
      publisher: this.publisher,
      ...(this.changeImage &&
        this.book?.imageUrl &&
        !this.imageBlob && { deleteCover: true }),
      ...(this.imageBlob && { imageBlob: this.imageBlob }),
    };

    this.$emit('onSubmitBookForm', payload);
  }
}
</script>

<style lang="scss" scoped>
.BookForm {
  &--img {
    &:hover {
      .BookForm--img-overlay {
        opacity: 1;
      }
    }
  }
  &--img-overlay {
    top: 0;
    left: 0;
    opacity: 0;
    transition: 0.3s opacity;
    background-color: var(--overlay-light);
  }
}
</style>
