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
          image: image && image.length > 0 ? image[0] : null,
          house_number,
          street,
          city_code,
          barangay_code,
          map_url,
        });
        const response = await api.post(`${route}`, formData, {
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

    async update({
      healthCenterID,
      name,
      limit,
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
          limit,
          image: image && image.length > 0 ? image[0] : null,
          house_number,
          street,
          city_code,
          barangay_code,
          map_url,
          _method: 'PUT',
        });
        const response = await api.post(
          `${route}/${healthCenterID}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
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

    async get({ healthCenterID }) {
      try {
        const response = await api.get(`${route}/${healthCenterID}`);
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

    async getOperationHour({ healthCenterID }) {
      try {
        const response = await api.get(
          `${route}/operation-hour/${healthCenterID}`
        );
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

    async updateOperationHour({ healthCenterID, timeTo, timeFrom }) {
      try {
        const response = await api.put(
          `${route}/operation-hour/${healthCenterID}`,
          { time_from: timeFrom, time_to: timeTo }
        );
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

    async delete(userID) {
      try {
        const response = await api.delete(`${route}/${userID}`);
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
