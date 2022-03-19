export interface Book {
  readonly id: string
  readonly name: string,
  readonly author: string,
  readonly publisher: string,
  readonly src: string,
}

export interface BooksState {
  books: Book[];
}
