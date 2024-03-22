import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { toURLSearchParams } from 'src/extras/http';

const route = '/api/appointment';

export const useAppointmentStore = defineStore('appointment', {
  actions: {
    async list(
      { search, dateFrom, dateTo, timeFrom, timeTo, purpose }
    ) {
      try {
        const params = toURLSearchParams({
          search: search,
          dateFrom: dateFrom,
          dateTo: dateTo,
          timeFrom: timeFrom,
          timeTo: timeTo,
          purpose: purpose,
        });
        const response = await api.get(`${route}/${params ? `?${params}` : ''}`);
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
      first_name= '',
      last_name= '',
      date,
      time_from,
      time_to,
      purpose,
      pets
    }) {
      try {
        const response = await api.post(`${route}`, {
          first_name,
          last_name,
          date,
          time_from,
          time_to,
          purpose,
          pets
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

    async filter(
      { date }
    ) {
      try {
        const params = toURLSearchParams({
          date: date,
        });
        const response = await api.get(`${route}/filter/${params ? `?${params}` : ''}`);
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

    async delete(appointments) {
      try {
        const response = await api.delete(`${route}/delete`, {
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              appointments: appointments
            }
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

    async check(condition) {
      try {
        const response = await api.get(`${route}/check/${condition}`);
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
