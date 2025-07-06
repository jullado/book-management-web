export type ResponseModel<T> = {
  status: boolean;
  code: number;
  message: string;
  data: T;
};

export type BookModel = {
    id: string;
    title: string;
    author: string;
    genre: string;
    published_year: number;
    created_at: string;
    updated_at: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export type BookDataTableModel = {
    pagination: Pagination;
    data: BookModel[];
}

export type AddBookModel = {
    title: string;
    author: string;
    genre: string;
    published_year: number;
}

export type UpdateBookModel = AddBookModel & { id: string };