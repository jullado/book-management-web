import { defineStore } from "pinia";
import api from "../utils/axios";
import type { ResponseModel, BookModel, UpdateBookModel, AddBookModel, BookDataTableModel } from "../types/book";
import type { AxiosResponse } from "axios";

export const useBookStore = defineStore("book", {
  state: () => ({
    books: [] as BookModel[],
  }),
  actions: {
    async fetchBooks(
      page: number,
      limit: number,
      keyword: string,
      genre: string
    ): Promise<ResponseModel<BookDataTableModel>> {
      const response: AxiosResponse<ResponseModel<BookDataTableModel>> = await api.get(
        "/api/v1/book/table",
        {
          params: {
            page,
            limit,
            keyword,
            genre,
          },
        }
      );

      return response.data;
    },

    async addBook(book: AddBookModel): Promise<ResponseModel<BookModel>> {
      const response: AxiosResponse<ResponseModel<BookModel>> = await api.post(
        "/api/v1/book",
        book,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    async updateBook(book: UpdateBookModel): Promise<ResponseModel<BookModel>> {
      const response: AxiosResponse<ResponseModel<BookModel>> = await api.put(
        `/api/v1/book/${book.id}`,
        book,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    async deleteBook(id: string): Promise<ResponseModel<string>> {
      const response: AxiosResponse<ResponseModel<string>> = await api.delete(
        `/api/v1/book/${id}`
      );
      return response.data;
    },
  },
});
