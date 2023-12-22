import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { toURLSearchParams } from 'src/extras/http';
import { toFormData } from 'boot/axios';

const route = '/api/user';

export const useUserStore = defineStore('user', {
  actions: {
    async list({ sortBy, search, healthCenterID, position }) {
      try {
        const params = toURLSearchParams({
          sortBy,
          search,
          health_center_id: healthCenterID,
          position,
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
      image,
      first_name,
      last_name,
      birthday,
      mobile_number,
      password,
      password_confirmation,
      level,
      position,
      healthCenterID,
    }) {
      try {
        const formData = toFormData({
          image: image && image.length > 0 ? image[0] : null,
          first_name,
          last_name,
          birthday,
          mobile_number,
          password,
          password_confirmation,
          level,
          position,
          health_center_id: healthCenterID,
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

    async update({ image, first_name, last_name, birthday, position, userID }) {
      try {
        const formData = toFormData({
          image: image && image.length > 0 ? image[0] : null,
          first_name,
          last_name,
          birthday,
          position,
        });
        const response = await api.post(
          `${route}/${userID}?_method=PUT`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response.data;
      } catch (e) {
        console.log(e);
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
