import { useQuery } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { isUserAdmin } from '@/lib/database';

export const useAdmin = () => {
  const { user } = useUser();

  const {
    data: isAdmin = false,
    isLoading,
    error
  } = useQuery({
    queryKey: ['isAdmin', user?.id],
    queryFn: () => isUserAdmin(user?.id || ''),
    enabled: !!user?.id,
  });

  return {
    isAdmin,
    isLoading,
    error,
  };
};