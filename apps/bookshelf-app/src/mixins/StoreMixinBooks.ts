import { Vue, Component, Watch } from 'vue-property-decorator';
import { Book } from '../store/modules/books/models';
import { BookApiPayload } from '../api/books';
import { AxiosError } from 'axios';

@Component
export class StoreMixinBooks extends Vue {
  private lastFetched = null;
  protected Books_initLoading = false;
  protected Books_submitLoading = false;
  protected Books_deleteLoading = false;

  protected get Books_books() {
    return this.$store.getters['books/books'];
  }

  protected get Books_book() {
    return this.$store.getters['books/book'];
  }

  protected get Books_getBooks(): Book[] {
    return this.$store.getters['books/books'];
  }

  protected get Books_bookID(): string {
    return this.$route.params.bookID;
  }

  @Watch('Books_bookID', { immediate: true, }) private onBookIDChanged(bookID: string) {
    if (this.Books_book?.id != bookID) this.Books_getBook(bookID);  //TODO: Create last time fetched timestamp for refresh of the current state;
  }

  protected Books_getAllBooks(): void {
    this.Books_initLoading = true;
    this.$store.dispatch('books/getBooks').then((books: Book[]) => {
      this.Books_initLoading = false;
      this.Books_onGetAllSuccess(books);
    }).catch((error: AxiosError) => {
      this.Books_initLoading = false;
      this.Books_onGetAllError(error);
    });
  }

  protected Books_getBook(bookID = this.Books_bookID): void {
    if (!bookID) {
      this.$store.dispatch('books/clearBook')
      return;
    }
    this.Books_initLoading = true;
    this.$store.dispatch('books/getOneBook', { bookID }).then((book: Book) => {
      this.Books_initLoading = false;
      this.Books_onGetSuccess(book);
    }).catch((err: AxiosError) => {
      this.Books_initLoading = false;
      this.Books_onGetError(err);
    });
  }

  protected handleSubmitBookForm(payload: BookApiPayload): void {
    this.Books_submitLoading = true;
    this.$store.dispatch(payload.bookID ? 'books/updateBook' : 'books/storeBook', payload).then((book: Book) => {
      this.Books_submitLoading = false;
      this.Books_onSubmitSuccess(book);
    }).catch((error: AxiosError) => {
      this.Books_submitLoading = false;
      this.Books_onSubmitError(error);
    });
  }

  protected handleDeleteBook(bookID: string): void {
    this.Books_deleteLoading = true;
    this.$store.dispatch('books/deleteBook', { bookID }).then(() => {
      this.Books_deleteLoading = false;
      this.Books_onDeleteSuccess(bookID);
    }).catch((error: AxiosError) => {
      this.Books_deleteLoading = false;
      this.Books_onDeleteError(error);
    });
  }

  protected clearBook() {
    this.$store.dispatch('books/clearBook');
    this.lastFetched = null;
    this.Books_initLoading = false;
    this.Books_submitLoading = false;
    this.Books_deleteLoading = false;
  }

  protected Books_onGetAllSuccess(books: Book[]): void {
    // Use this function the same way that you are using thi Vue Life hooks (just overwrite it in your controller);
  }

  protected Books_onGetAllError(error: AxiosError): void {
    // Use this function the same way that you are using thi Vue Life hooks (just overwrite it in your controller);
  }

  protected Books_onGetSuccess(book: Book): void {
    // Use this function the same way that you are using thi Vue Life hooks (just overwrite it in your controller);
  }

  protected Books_onGetError(error: AxiosError): void {
    // Use this function the same way that you are using thi Vue Life hooks (just overwrite it in your controller);
  }

  protected Books_onSubmitSuccess(book: Book): void {
    // Use this function the same way that you are using thi Vue Life hooks (just overwrite it in your controller);
  }

  protected Books_onSubmitError(error: AxiosError): void {
    // Use this function the same way that you are using thi Vue Life hooks (just overwrite it in your controller);
  }

  protected Books_onDeleteSuccess(bookID: string): void {
    // Use this function the same way that you are using thi Vue Life hooks (just overwrite it in your controller);
  }

  protected Books_onDeleteError(error: AxiosError): void {
    // Use this function the same way that you are using thi Vue Life hooks (just overwrite it in your controller);
  }
}
