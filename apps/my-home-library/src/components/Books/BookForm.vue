<template>
  <v-container>
    <v-row justify='center'>
      <v-col class='text-center mt-5'>
        <h2>{{ isEditMode ? 'Update Your Book' : 'Add Your New Book' }}</h2>
      </v-col>
    </v-row>
    <v-row justify='center'>
      <v-col cols='12' md='4'>
        <v-text-field label='Name'/>
        <v-text-field label='Author'/>
        <v-text-field label='Publisher'/>
        <v-file-input label="Cover Image" append-icon='photo_camera' prepend-icon='' @change='onImageUploaded'/>
        <Cropper ref='cropper' :src='imageSrc' @change='onImageCrop' :stencil-props="{
          aspectRatio: 3/4,
        }"/>
        <v-btn class='mt-5' :loading='submitLoading' width='100%' color='primary' @click='onSubmit'>Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { Book } from '../../store/modules/books/models';

@Component({
  inheritAttrs: false,
  components: {
    Cropper
  }
})
export default class AddNewBookForm extends Vue {
  @Prop() readonly submitLoading!: boolean;
  @Prop() readonly book!: Book;

  protected imageSrc = '';
  protected name = '';
  protected author = '';
  protected publisher = '';
  protected imageBlob: unknown = null;

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

  protected onImageCrop({canvas}: {canvas: HTMLCanvasElement}): void {
    canvas.toBlob((a: unknown) => {
      this.imageBlob = a;
    });
  }

  protected onImageUploaded(file: Blob): void {
    if (!file) {
      this.imageSrc = '';
      return;
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }

  protected onSubmit(): void {
    let payload = {
      name: this.name,
      author: this.author,
      publisher: this.publisher,
      ...(this.imageBlob && {imageBlob: this.imageBlob}),
    }

    this.$emit('onSubmitBookForm', payload);
  }
}
</script>
