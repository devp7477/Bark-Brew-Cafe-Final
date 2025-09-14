import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  createContactMessage, 
  getAllContactMessages, 
  updateContactMessageStatus, 
  deleteContactMessage,
  type ContactMessage 
} from '@/lib/database';

export const useContactMessages = () => {
  const queryClient = useQueryClient();

  const {
    data: contactMessages = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: getAllContactMessages,
  });

  const createContactMessageMutation = useMutation({
    mutationFn: createContactMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
    },
  });

  const updateContactMessageStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactMessage['status'] }) =>
      updateContactMessageStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
    },
  });

  const deleteContactMessageMutation = useMutation({
    mutationFn: deleteContactMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
    },
  });

  return {
    contactMessages,
    isLoading,
    error,
    createContactMessage: createContactMessageMutation.mutate,
    updateContactMessageStatus: updateContactMessageStatusMutation.mutate,
    deleteContactMessage: deleteContactMessageMutation.mutate,
    isCreating: createContactMessageMutation.isPending,
    isUpdating: updateContactMessageStatusMutation.isPending,
    isDeleting: deleteContactMessageMutation.isPending,
  };
};
