import { useAuth as useAuthContext } from '@/providers/AuthProvider';

export const useAuth = () => {
  return useAuthContext();
};