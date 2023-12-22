import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { toURLSearchParams } from 'src/extras/http';

const route = '/api/schedule';

export const useScheduleStore = defineStore('schedule', {
  actions: {
    async list({ sortBy, search, healthCenterID, conditions }) {
      try {
        const params = toURLSearchParams({
          sortBy,
          search,
          health_center_id: healthCenterID,
          conditions,
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
        const response = await api.post(`${route}/`, {
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

    async getByReferenceNumber(referenceNumber) {
      try {
        const response = await api.get(
          `${route}/reference-number/${referenceNumber}`
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
  },
});
