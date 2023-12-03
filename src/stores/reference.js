import { defineStore } from "pinia";
import { api } from "boot/axios";
import { toURLSearchParams } from "src/extras/http";

const route = "/api/reference";

export const useReferenceStore = defineStore("reference", {
  actions: {
    async getBarangays({ page, perPage, search }) {
      try {
        const params = toURLSearchParams({ page, search, per_page: perPage });
        const response = await api.get(`${route}/barangay?${params}`);
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
