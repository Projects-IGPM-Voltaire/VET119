import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { toURLSearchParams } from 'src/extras/http';

const route = 'api/email/verify';

export const useVerifyStore = defineStore('verify', {
  actions: {
    async verify(
      params, query
    ) {
      try {
        const response = await api.get(
          `${route}/${params.id}/${params.hash}?expires=${query.expires}&signature=${query.signature}`);
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
