import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  User, 
  PawPrint, 
  Phone, 
  Mail, 
  MapPin, 
  Edit, 
  Trash2, 
  Eye, 
  Loader2,
  Users,
  BookOpen,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useAdminBookings, useAdminUsers } from "@/hooks/useAdminData";
import { useContactMessages } from "@/hooks/useContactMessages";
import { supabase } from "@/lib/supabase";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isUpdatingBooking, setIsUpdatingBooking] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [selectedContactMessage, setSelectedContactMessage] = useState<any>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const { 
    bookings, 
    isLoading: bookingsLoading, 
    error: bookingsError 
  } = useAdminBookings();

  // Debug logging (can be removed in production)
  // console.log('AdminDashboard - Bookings:', bookings);
  // console.log('AdminDashboard - Bookings Loading:', bookingsLoading);
  // console.log('AdminDashboard - Bookings Error:', bookingsError);
  
  const { 
    users, 
    isLoading: usersLoading, 
    error: usersError 
  } = useAdminUsers();
  
  const { contactMessages, isLoading: contactLoading, updateContactMessageStatus, deleteContactMessage } = useContactMessages();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      // Booking statuses
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      // Contact message statuses
      case 'new':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'read':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'replied':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewContactMessage = (message: any) => {
    setSelectedContactMessage(message);
    setIsContactModalOpen(true);
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await updateContactMessageStatus(messageId, 'read');
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleDeleteContactMessage = async (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContactMessage(messageId);
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "user":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Booking action handlers
  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleEditBooking = async (booking: any) => {
    setSelectedBooking(booking);
    setIsUpdatingBooking(true);
    
    try {
      // Toggle status between pending/confirmed/completed
      const newStatus = booking.status === 'pending' ? 'confirmed' : 
                       booking.status === 'confirmed' ? 'completed' : 'pending';
      
      // Update booking status
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', booking.id)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh bookings
      window.location.reload();
    } catch (error) {
      console.error('Failed to update booking:', error);
    } finally {
      setIsUpdatingBooking(false);
    }
  };

  const handleDeleteBooking = async (booking: any) => {
    if (!confirm(`Are you sure you want to delete the booking for ${booking.pet_name}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', booking.id);

      if (error) throw error;
      
      // Refresh bookings
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  // User action handlers
  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleEditUser = async (user: any) => {
    // Toggle user role between user and admin
    const newRole = user.role === 'user' ? 'admin' : 'user';
    
    if (!confirm(`Are you sure you want to change ${user.name}'s role to ${newRole.toUpperCase()}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: newRole })
        .eq('id', user.id);

      if (error) throw error;
      
      // Refresh users
      window.location.reload();
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  const handleDeleteUser = async (user: any) => {
    if (!confirm(`Are you sure you want to delete user ${user.name}? This action cannot be undone.`)) {
      return;
    }

    setIsDeletingUser(true);

    try {
      // First delete user's bookings
      const { error: bookingsError } = await supabase
        .from('bookings')
        .delete()
        .eq('user_id', user.clerk_user_id);

      if (bookingsError) {
        console.warn('Failed to delete user bookings:', bookingsError);
      }

      // Then delete user profile
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', user.id);

      if (error) throw error;
      
      // Refresh users
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setIsDeletingUser(false);
    }
  };

  // Calculate statistics
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const totalUsers = users.length;
  
  // Calculate revenue from confirmed and completed bookings
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (b.price || 0), 0);

  // Debug logging (can be removed in production)
  // console.log('Admin Dashboard Statistics:', { totalBookings, pendingBookings, confirmedBookings, completedBookings, totalRevenue });

  if (bookingsLoading || usersLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-warm-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-coffee-dark mb-4">
                Admin Dashboard
              </h1>
              <p className="text-lg text-coffee-medium max-w-2xl mx-auto">
                Manage bookings, users, and monitor your pet care business
              </p>
            </div>
          </div>
        </section>

        {/* Statistics Cards */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold text-primary">{totalBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold text-primary">{totalUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold text-primary">₹{totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-primary">{pendingBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
                <TabsTrigger value="bookings">All Bookings</TabsTrigger>
                <TabsTrigger value="users">All Users</TabsTrigger>
                <TabsTrigger value="messages">Contact Messages</TabsTrigger>
              </TabsList>

              {/* All Bookings */}
              <TabsContent value="bookings" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary">All Bookings</h2>
                  <div className="flex gap-2">
                    <Badge variant="outline">Pending: {pendingBookings}</Badge>
                    <Badge variant="outline">Confirmed: {confirmedBookings}</Badge>
                    <Badge variant="outline">Completed: {completedBookings}</Badge>
                  </div>
                </div>

                {bookingsError ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">Error loading bookings</h3>
                      <p className="text-muted-foreground mb-2">{bookingsError.message || 'Failed to load bookings'}</p>
                      <div className="text-xs text-red-600 bg-red-50 p-2 rounded mb-4">
                        <pre>{JSON.stringify(bookingsError, null, 2)}</pre>
                      </div>
                      <Button onClick={() => window.location.reload()}>
                        Retry
                      </Button>
                    </CardContent>
                  </Card>
                ) : bookings.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">No bookings found</h3>
                      <p className="text-muted-foreground">Bookings will appear here as customers make appointments.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="card-float">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-primary mb-2">{booking.service_type}</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(booking.booking_date)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {formatTime(booking.booking_time)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <PawPrint className="w-4 h-4" />
                                  {booking.pet_name} ({booking.pet_type})
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {booking.user_profiles?.name || 'Unknown User'}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.toUpperCase()}
                              </Badge>
                              <div className="text-2xl font-bold text-accent">
                                ₹{booking.price}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm text-muted-foreground">
                              <p>Customer: {booking.user_profiles?.name || 'Unknown'}</p>
                              <p>Email: {booking.user_profiles?.email || 'N/A'}</p>
                              <p>Phone: {booking.phone || booking.user_profiles?.phone || 'N/A'}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewBooking(booking)}
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditBooking(booking)}
                                disabled={isUpdatingBooking}
                                title="Update Status"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteBooking(booking)}
                                title="Delete Booking"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* All Users */}
              <TabsContent value="users" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary">All Users</h2>
                  <span className="text-sm text-muted-foreground">
                    {users.length} user{users.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {users.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">No users found</h3>
                      <p className="text-muted-foreground">Users will appear here as they sign up.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {users.map((user) => (
                      <Card key={user.id} className="card-float">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-accent-gradient rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-accent-foreground" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-primary">{user.name}</h3>
                                <p className="text-muted-foreground">{user.email}</p>
                                <p className="text-sm text-muted-foreground">
                                  Joined: {formatDate(user.created_at)}
                                </p>
                              </div>
                            </div>
                            <Badge className={getRoleColor(user.role)}>
                              {user.role.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm text-muted-foreground">
                              <p>Phone: {user.phone || 'Not provided'}</p>
                              <p>User ID: {user.clerk_user_id}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewUser(user)}
                                title="View User Details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditUser(user)}
                                title="Change User Role"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteUser(user)}
                                disabled={isDeletingUser}
                                title="Delete User"
                                className="hover:bg-red-50 hover:border-red-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Contact Messages */}
              <TabsContent value="messages" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary">Contact Messages</h2>
                  <span className="text-sm text-muted-foreground">
                    {contactMessages.length} message{contactMessages.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {contactMessages.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">No messages yet</h3>
                      <p className="text-muted-foreground">Contact form submissions will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {contactMessages.map((message) => (
                      <Card key={message.id} className="card-float">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-accent-gradient rounded-full flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-accent-foreground" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-primary">{message.name}</h3>
                                <p className="text-muted-foreground">{message.email}</p>
                                <p className="text-sm text-muted-foreground">
                                  {message.phone && `Phone: ${message.phone}`}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Sent: {formatDate(message.created_at)}
                                </p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(message.status)}>
                              {message.status.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold text-primary mb-2">Subject: {message.subject}</h4>
                            <p className="text-muted-foreground mb-2">{message.message}</p>
                            {message.inquiry_type && (
                              <Badge variant="outline" className="text-xs">
                                {message.inquiry_type}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm text-muted-foreground">
                              <p>Message ID: {message.id}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewContactMessage(message)}
                                title="View Message Details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {message.status === 'new' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleMarkAsRead(message.id)}
                                  title="Mark as Read"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteContactMessage(message.id)}
                                title="Delete Message"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      {/* Booking Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Booking Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              {/* Service Information */}
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {selectedBooking.service_type}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-accent">
                    ₹{selectedBooking.price}
                  </span>
                  <Badge className={getStatusColor(selectedBooking.status)}>
                    {selectedBooking.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pet Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <PawPrint className="w-4 h-4" />
                    Pet Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pet Name:</span>
                      <span className="font-medium">{selectedBooking.pet_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pet Type:</span>
                      <span className="font-medium">{selectedBooking.pet_type}</span>
                    </div>
                    {selectedBooking.pet_breed && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Breed:</span>
                        <span className="font-medium">{selectedBooking.pet_breed}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{formatDate(selectedBooking.booking_date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{formatTime(selectedBooking.booking_time)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="font-medium">{formatDate(selectedBooking.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{selectedBooking.user_profiles?.name || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{selectedBooking.user_profiles?.email || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{selectedBooking.phone || selectedBooking.user_profiles?.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User ID:</span>
                    <span className="font-medium text-xs">{selectedBooking.user_id}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">Additional Notes</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">{selectedBooking.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* User Details Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              User Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              {/* User Information */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent-gradient rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{selectedUser.name}</h3>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                    <Badge className={getRoleColor(selectedUser.role)}>
                      {selectedUser.role.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* User Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Account Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{selectedUser.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{selectedUser.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role:</span>
                      <Badge className={getRoleColor(selectedUser.role)}>
                        {selectedUser.role.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Account Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Joined:</span>
                      <span className="font-medium">{formatDate(selectedUser.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span className="font-medium">{formatDate(selectedUser.updated_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">User ID:</span>
                      <span className="font-medium text-xs">{selectedUser.clerk_user_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profile ID:</span>
                      <span className="font-medium text-xs">{selectedUser.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Actions */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Actions</h4>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleEditUser(selectedUser)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Change Role to {selectedUser.role === 'user' ? 'Admin' : 'User'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDeleteUser(selectedUser)}
                    disabled={isDeletingUser}
                    className="flex-1 hover:bg-red-50 hover:border-red-200"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete User
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Message Details Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Contact Message Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedContactMessage && (
            <div className="space-y-6">
              {/* Message Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-gradient rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{selectedContactMessage.name}</h3>
                    <p className="text-muted-foreground">{selectedContactMessage.email}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedContactMessage.phone && `Phone: ${selectedContactMessage.phone}`}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(selectedContactMessage.status)}>
                  {selectedContactMessage.status.toUpperCase()}
                </Badge>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Subject</h4>
                  <p className="text-muted-foreground">{selectedContactMessage.subject}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Message</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">{selectedContactMessage.message}</p>
                </div>

                {selectedContactMessage.inquiry_type && (
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Inquiry Type</h4>
                    <Badge variant="outline">{selectedContactMessage.inquiry_type}</Badge>
                  </div>
                )}
              </div>

              {/* Message Metadata */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Message Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sent:</span>
                    <span className="font-medium">{formatDate(selectedContactMessage.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="font-medium">{formatDate(selectedContactMessage.updated_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Message ID:</span>
                    <span className="font-medium text-xs">{selectedContactMessage.id}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                {selectedContactMessage.status === 'new' && (
                  <Button 
                    onClick={() => handleMarkAsRead(selectedContactMessage.id)}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Read
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => handleDeleteContactMessage(selectedContactMessage.id)}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;