import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { 
  getUserProfile, 
  createUserProfile, 
  updateUserProfile,
  type UserProfile 
} from '@/lib/database';

export const useUserProfile = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: () => getUserProfile(user?.id || ''),
    enabled: !!user?.id,
  });

  const createProfileMutation = useMutation({
    mutationFn: (userData: {
      email: string;
      name: string;
      phone?: string;
      role?: 'user' | 'admin';
    }) => createUserProfile(user?.id || '', userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', user?.id] });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updates: Partial<UserProfile>) =>
      updateUserProfile(user?.id || '', updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', user?.id] });
    },
  });

  return {
    profile,
    isLoading,
    error,
    createProfile: createProfileMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    isCreating: createProfileMutation.isPending,
    isUpdating: updateProfileMutation.isPending,
  };
};
