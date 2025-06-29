export type ResponseModel<T> = {
  status: boolean;
  code: number;
  message: string;
  data: T;
};

export type SigninModel = {
  type: string;
  access_token: string;
};
