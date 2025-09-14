import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBusinessInfo, updateBusinessInfo, type BusinessInfo } from '@/lib/database';

export const useBusinessInfo = () => {
  const queryClient = useQueryClient();

  const {
    data: businessInfo,
    isLoading,
    error
  } = useQuery({
    queryKey: ['businessInfo'],
    queryFn: getBusinessInfo,
  });

  const updateBusinessInfoMutation = useMutation({
    mutationFn: updateBusinessInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessInfo'] });
    },
  });

  return {
    businessInfo,
    isLoading,
    error,
    updateBusinessInfo: updateBusinessInfoMutation.mutate,
    isUpdating: updateBusinessInfoMutation.isPending,
  };
};
