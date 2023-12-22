import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { toURLSearchParams } from 'src/extras/http';
import { toFormData } from 'boot/axios';

const route = '/api/health-center';

export const useHealthCenterStore = defineStore('health-center', {
  actions: {
    async list({ sortBy, search, barangayCode }) {
      try {
        const params = toURLSearchParams({
          sortBy,
          search,
          barangay_code: barangayCode,
        });
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

    async create({
      name,
      image,
      house_number,
      street,
      city_code,
      barangay_code,
      map_url,
    }) {
      try {
        const formData = toFormData({
          name,
          image,
          house_number,
          street,
          city_code,
          barangay_code,
          map_url,
        });
        const response = await api.post(`${route}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
