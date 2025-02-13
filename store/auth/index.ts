import { create } from "zustand";

interface AuthFormStore {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  termsAndConditions: boolean;
  setTermsAndConditions: (value: boolean) => void;
  loading: boolean;
  setIsLoading: (value: boolean) => void;
  resetForm: () => void;
}

export const useAuthFormStore = create<AuthFormStore>((set) => ({
  email: "",
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  confirmPassword: "",
  setConfirmPassword: (password) => set({ confirmPassword: password }),
  termsAndConditions: false,
  setTermsAndConditions: (value) => set({ termsAndConditions: value }),
  loading: false,
  setIsLoading: (value) => set({ loading: value }),
  resetForm: () =>
    set({
      email: "",
      password: "",
      confirmPassword: "",
      termsAndConditions: false,
    }),
}));
