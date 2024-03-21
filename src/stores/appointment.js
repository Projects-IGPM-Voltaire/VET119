import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { toURLSearchParams } from 'src/extras/http';

const route = '/api/appointment';

export const useAppointmentStore = defineStore('appointment', {
  actions: {
    async list(condition = null) {
      try {
        const response = await api.get(`${route}/${condition ? `?${condition}` : ''}`);
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
      first_name,
      last_name,
      birthday,
      date,
      time_from,
      time_to,
      healthCenterID,
      userID,
    }) {
      try {
        const response = await api.post(`${route}`, {
          first_name,
          last_name,
          birthday,
          date,
          time_from,
          time_to,
          health_center_id: healthCenterID,
          user_id: userID ?? null,
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

    async update({ date, time_from, time_to, scheduleID }) {
      try {
        const response = await api.put(`${route}/${scheduleID}`, {
          date,
          time_from,
          time_to,
          scheduleID,
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

    async delete(schedule) {
      try {
        const response = await api.delete(`${route}/${schedule}`);
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

    async check(condition) {
      try {
        const response = await api.get(`${route}/${condition}`);
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
