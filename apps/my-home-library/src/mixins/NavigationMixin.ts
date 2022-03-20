import { Vue, Component } from 'vue-property-decorator';

@Component
export class NavigationMixin extends Vue {
  public userDataLoading = null;

  goToHome(): void {
    this.$router.push({name: 'Books'});
  }

  goToBook(bookID: string): void {
    console.log('awdawd')
    this.$router.push({name: 'Books.edit', params: { bookID }});
  }
}
