import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { toURLSearchParams } from 'src/extras/http';

const route = '/api/health-center';

export const useHealthCenterStore = defineStore('health-center', {
  actions: {
    async list({ sortBy, search }) {
      try {
        const params = toURLSearchParams({ sortBy, search });
        const response = await api.get(`${route}?${params}`);
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
