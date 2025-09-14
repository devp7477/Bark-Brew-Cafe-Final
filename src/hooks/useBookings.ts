import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { 
  getUserBookings, 
  createBooking, 
  updateBooking, 
  deleteBooking,
  subscribeToUserBookings,
  type Booking 
} from '@/lib/database';

export const useBookings = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    data: bookings = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: () => getUserBookings(user?.id || ''),
    enabled: !!user?.id,
  });

  // Set up real-time subscription
  useEffect(() => {
    if (!user?.id) return;

    const subscription = subscribeToUserBookings(user.id, (newBookings) => {
      queryClient.setQueryData(['bookings', user.id], newBookings);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id, queryClient]);

  const createBookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.id] });
    },
  });

  const updateBookingMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Booking> }) =>
      updateBooking(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.id] });
    },
  });

  const deleteBookingMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.id] });
    },
  });

  return {
    bookings,
    isLoading,
    error,
    createBooking: createBookingMutation.mutate,
    updateBooking: updateBookingMutation.mutate,
    deleteBooking: deleteBookingMutation.mutate,
    isCreating: createBookingMutation.isPending,
    isUpdating: updateBookingMutation.isPending,
    isDeleting: deleteBookingMutation.isPending,
  };
};
