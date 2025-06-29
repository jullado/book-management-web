import { defineStore } from "pinia";
import api from "../utils/axios";
import type { ResponseModel, SigninModel } from "../types/auth";
import type { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({}),
  actions: {
    async signin(
      username: string,
      password: string
    ): Promise<ResponseModel<SigninModel>> {
      const response: AxiosResponse<ResponseModel<SigninModel>> =
        await api.post(
          "/api/v1/user/signin",
          {
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      if (response.status == 200 && response.data.data.type == "Bearer") {
        Cookies.set("access_token", response.data.data.access_token);
      }

      return response.data;
    },
  },
});
