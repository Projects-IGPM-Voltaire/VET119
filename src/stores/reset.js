import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { toURLSearchParams } from 'src/extras/http';

const route = 'api/forgot-password';

export const useResetStore = defineStore('reset', {
  actions: {
    async send(
      email
    ) {
      try {
        const response = await api.post(`${route}`, {
          email,
        });
        return response.data;
      } catch (e) {
        return {
          message: e.response.data.message,
          code: e.response.data.code,
          success: false,
          data: null,
        };
      }
    },

    async reset(
      code, password
    ) {
      try {
        const response = await api.post(`${route}/reset`, {
          code,
          password,
        });
        return response.data;
      } catch (e) {
        return {
          message: e.response.data.message,
          code: e.response.data.code,
          success: false,
          data: null,
        };
      }
    },

  },
});
