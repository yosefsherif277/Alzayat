import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';

export const useAuthStore = create((set) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      toast.success(useTranslation.getState().t('registrationSuccess'));
    } catch (error) {
      toast.error(error.response?.data?.message || useTranslation.getState().t('registrationFailed'));
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success(useTranslation.getState().t('loginSuccess'));
    } catch (error) {
      toast.error(error.response?.data?.message || useTranslation.getState().t('invalidCredentials'));
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(useTranslation.getState().t('logoutSuccess'));
    } catch (error) {
      toast.error(error.response?.data?.message || useTranslation.getState().t('logoutError'));
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/updateProfile", data);
      set({ authUser: res.data });
      toast.success(useTranslation.getState().t('profileUpdateSuccess'));
    } catch (error) {
      toast.error(error.response?.data?.message || useTranslation.getState().t('profileUpdateError'));
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));