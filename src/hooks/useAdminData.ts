import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { 
  getAllBookings, 
  getAllUsers,
  subscribeToAllBookings 
} from '@/lib/database';

export const useAdminBookings = () => {
  const {
    data: bookings = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['adminBookings'],
    queryFn: getAllBookings,
  });

  // Set up real-time subscription
  useEffect(() => {
    const subscription = subscribeToAllBookings((newBookings) => {
      // This would need to be handled differently in a real app
      // For now, we'll rely on React Query's refetch
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    bookings,
    isLoading,
    error,
  };
};

export const useAdminUsers = () => {
  const {
    data: users = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: getAllUsers,
  });

  return {
    users,
    isLoading,
    error,
  };
};
