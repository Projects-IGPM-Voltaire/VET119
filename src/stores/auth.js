import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { LocalStorage } from 'quasar';

const route = '/api/auth';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isAuthenticated: false,
      user: null,
      accessToken: null,
    };
  },

  actions: {
    async login({ username, password }) {
      try {
        const response = await api.post(`${route}/login`, {
          username,
          password,
        });
        const result = response.data;
        this.processAuth({
          user: result.data.user,
          accessToken: result.data.access_token,
        });
        return result;
      } catch (e) {
        return {
          message: e.response.data.message,
          code: e.response.data.code,
          success: false,
          data: null,
        };
      }
    },

    processAuth({ user, accessToken }) {
      this.user = Object.assign({ ...user });
      this.accessToken = accessToken;
      LocalStorage.set('user', JSON.stringify(this.user));
      LocalStorage.set('access_token', this.accessToken);
      this.isAuthenticated = true;
    },

    validateSession() {
      const user = JSON.parse(LocalStorage.getItem('user')) || null;
      const accessToken = LocalStorage.getItem('access_token') || null;
      if (user && accessToken) {
        this.user = Object.assign({}, user);
        this.accessToken = accessToken;
        this.isAuthenticated = true;
      }
    },

    destroySession() {
      this.user = null;
      this.accessToken = null;
      this.isAuthenticated = false;
      LocalStorage.clear();
    },

    async register({
      first_name,
      last_name,
      birthday,
      mobile_number,
      password,
      password_confirmation,
      level,
      city_code,
      barangay_code,
      house_number,
      street,
    }) {
      try {
        const response = await api.post(`${route}/register`, {
          first_name,
          last_name,
          birthday,
          mobile_number,
          password,
          password_confirmation,
          level,
          city_code,
          barangay_code,
          house_number,
          street,
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
