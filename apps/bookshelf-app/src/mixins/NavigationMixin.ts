import { Vue, Component } from 'vue-property-decorator';

@Component
export class NavigationMixin extends Vue {
  public userDataLoading = null;

  goToHome(): void {
    this.$router.push({ name: 'Books' });
  }

  goToBookDetails(bookID: string): void {
    this.$router.push({ name: 'Books.details', params: { bookID } });
  }

  goToBookEdit(bookID: string): void {
    this.$router.push({ name: 'Books.edit', params: { bookID } });
  }
}
