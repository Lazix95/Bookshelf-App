import { sendRequest } from './index';
import { AxiosResponse } from 'axios';
import { Book } from '../store/modules/books/models';

export interface BookApiPayload {
  bookID?: string;
  name: string;
  author: string;
  publisher: string;
  image: Blob;
}

interface BookApiResponse {
  book: Book;
}

interface BooksApiResponse {
  books: Book[];
}

export class booksApi {
  static getBooks(): Promise<AxiosResponse<BooksApiResponse>> {
    return sendRequest<BooksApiResponse>({ method: 'get', url: '/books' });
  }

  static getOneBook(bookID: number): Promise<AxiosResponse<BookApiResponse>> {
    return sendRequest<BookApiResponse>({
      method: 'get',
      url: `/books/${bookID}`,
    });
  }

  static storeBook(
    payload: BookApiPayload
  ): Promise<AxiosResponse<BookApiResponse>> {
    return sendRequest<BookApiResponse>({
      method: 'post',
      url: '/books',
      data: payload,
      useFormData: true,
    });
  }

  static updateBook(
    payload: BookApiPayload
  ): Promise<AxiosResponse<BookApiResponse>> {
    return sendRequest<BookApiResponse>({
      method: 'put',
      url: `/books/${payload.bookID}`,
      data: payload,
      useFormData: true,
    });
  }

  static deleteBook(bookID: number): Promise<AxiosResponse> {
    return sendRequest({ method: 'delete', url: `/books/${bookID}` });
  }
}
