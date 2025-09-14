import { supabase } from './supabase';

export interface Booking {
  id: string;
  user_id: string;
  service_type: string;
  pet_name: string;
  pet_type: string;
  pet_breed?: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  phone?: string;
  price: number;
  created_at: string;
  updated_at: string;
  user_profiles?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface UserProfile {
  id: string;
  clerk_user_id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiry_type?: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface BusinessInfo {
  id: string;
  business_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  business_hours: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  is_active: boolean;
  created_at: string;
}

// Contact Message Functions
export const createContactMessage = async (messageData: Omit<ContactMessage, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([messageData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getAllContactMessages = async () => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateContactMessageStatus = async (messageId: string, status: ContactMessage['status']) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', messageId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteContactMessage = async (messageId: string) => {
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', messageId);

  if (error) throw error;
};

// Business Info Functions
export const getBusinessInfo = async () => {
  try {
    const { data, error } = await supabase
      .from('business_info')
      .select('*')
      .single();

    if (error) {
      // If no business info exists or table doesn't exist, return default values
      return {
        id: 'default',
        business_name: 'Bark & Brew',
        phone: '+91 79 1234 5678',
        email: 'hello@barkandbrew.com',
        address: 'Sector 17, Gandhinagar',
        city: 'Gandhinagar',
        state: 'Gujarat',
        postal_code: '382017',
        country: 'India',
        business_hours: 'Mon-Sun: 7AM - 8PM',
        description: 'Where pets meet perfect coffee. Experience the best pet café and professional care services in the heart of Gandhinagar.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    return data;
  } catch (error) {
    // If table doesn't exist or any other error, return default values
    return {
      id: 'default',
      business_name: 'Bark & Brew',
      phone: '+91 79 1234 5678',
      email: 'hello@barkandbrew.com',
      address: 'Sector 17, Gandhinagar',
      city: 'Gandhinagar',
      state: 'Gujarat',
      postal_code: '382017',
      country: 'India',
      business_hours: 'Mon-Sun: 7AM - 8PM',
      description: 'Where pets meet perfect coffee. Experience the best pet café and professional care services in the heart of Gandhinagar.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
};

export const updateBusinessInfo = async (updates: Partial<BusinessInfo>) => {
  const { data, error } = await supabase
    .from('business_info')
    .upsert([{
      id: 'default',
      ...updates,
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// User Profile Functions
export const createUserProfile = async (clerkUserId: string, userData: {
  email: string;
  name: string;
  phone?: string;
  role?: 'user' | 'admin';
}) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([{
      clerk_user_id: clerkUserId,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      role: userData.role || 'user'
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserProfile = async (clerkUserId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserProfile = async (clerkUserId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('clerk_user_id', clerkUserId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Check if user is admin
export const isUserAdmin = async (clerkUserId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('clerk_user_id', clerkUserId)
    .single();

  if (error) return false;
  return data?.role === 'admin';
};

// Booking Functions
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserBookings = async (clerkUserId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', clerkUserId)
    .order('booking_date', { ascending: true });

  if (error) throw error;
  return data;
};

export const updateBooking = async (bookingId: string, updates: Partial<Booking>) => {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBooking = async (bookingId: string) => {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw error;
};

// Admin Functions
export const getAllBookings = async () => {
  try {
    // First try the complex query
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        user_profiles (
          name,
          email,
          phone
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Complex query failed:', error);
      // Fallback to simple query
      const { data: simpleData, error: simpleError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (simpleError) {
        console.error('Simple query also failed:', simpleError);
        throw simpleError;
      }

      // Get user profiles separately
      const userIds = simpleData?.map(b => b.user_id) || [];
      const { data: userProfiles } = await supabase
        .from('user_profiles')
        .select('clerk_user_id, name, email, phone')
        .in('clerk_user_id', userIds);

      // Merge the data
      const mergedData = simpleData?.map(booking => ({
        ...booking,
        user_profiles: userProfiles?.find(up => up.clerk_user_id === booking.user_id)
      }));

      return mergedData;
    }

    return data;
  } catch (err) {
    console.error('getAllBookings error:', err);
    throw err;
  }
};

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Service Functions
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) throw error;
  return data;
};

// Real-time subscriptions
export const subscribeToUserBookings = (clerkUserId: string, callback: (bookings: Booking[]) => void) => {
  return supabase
    .channel('user-bookings')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: `user_id=eq.${clerkUserId}`
      },
      async () => {
        const bookings = await getUserBookings(clerkUserId);
        callback(bookings);
      }
    )
    .subscribe();
};

export const subscribeToAllBookings = (callback: (bookings: any[]) => void) => {
  return supabase
    .channel('all-bookings')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'bookings'
      },
      async () => {
        const bookings = await getAllBookings();
        callback(bookings);
      }
    )
    .subscribe();
};