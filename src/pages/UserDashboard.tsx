import { useState, useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, PawPrint, Phone, Mail, MapPin, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useBookings } from "@/hooks/useBookings";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAdmin } from "@/hooks/useAdmin";

const UserDashboard = () => {
  const { user } = useUser();
  const { isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const { 
    bookings, 
    isLoading: bookingsLoading, 
    deleteBooking, 
    isDeleting 
  } = useBookings();
  
  const { 
    profile, 
    isLoading: profileLoading, 
    updateProfile, 
    isUpdating 
  } = useUserProfile();

  const [profileData, setProfileData] = useState({
    name: user?.firstName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    phone: user?.phoneNumbers[0]?.phoneNumber || "",
  });

  // Update profile data when user or profile changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.firstName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        phone: user.phoneNumbers[0]?.phoneNumber || "",
      });
    }
  }, [user, profile]);

  // Create user profile if it doesn't exist
  useEffect(() => {
    if (user && !profile && !profileLoading) {
      // Create profile automatically
      updateProfile({
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.firstName || "",
        phone: user.phoneNumbers[0]?.phoneNumber || "",
        role: 'user'
      });
    }
  }, [user, profile, profileLoading, updateProfile]);

  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'pending' || booking.status === 'confirmed'
  );
  const completedBookings = bookings.filter(booking => 
    booking.status === 'completed'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({
        name: profileData.name,
        phone: profileData.phone,
      });
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleBookingAction = async (bookingId: string, action: string) => {
    try {
      if (action === "cancel") {
        await deleteBooking(bookingId);
      }
    } catch (error) {
      console.error(`Failed to ${action} booking:`, error);
    }
  };

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

  if (bookingsLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
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
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-lg text-coffee-medium max-w-2xl mx-auto">
                Manage your pet care bookings and profile information
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* Upcoming Bookings */}
              <TabsContent value="upcoming" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary">Upcoming Bookings</h2>
                  <span className="text-sm text-muted-foreground">
                    {upcomingBookings.length} booking{upcomingBookings.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {upcomingBookings.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">No upcoming bookings</h3>
                      <p className="text-muted-foreground mb-4">You don't have any upcoming pet care appointments.</p>
                      {!isAdmin && (
                        <Button asChild>
                          <a href="/booking">Book Now</a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="card-float">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-primary mb-2">{booking.service_type}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                              </div>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-accent">
                              ₹{booking.price}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleBookingAction(booking.id, "view")}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleBookingAction(booking.id, "cancel")}
                                disabled={isDeleting}
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

              {/* Completed Bookings */}
              <TabsContent value="completed" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary">Completed Bookings</h2>
                  <span className="text-sm text-muted-foreground">
                    {completedBookings.length} booking{completedBookings.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {completedBookings.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">No completed bookings</h3>
                      <p className="text-muted-foreground">Your completed pet care appointments will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {completedBookings.map((booking) => (
                      <Card key={booking.id} className="card-float">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-primary mb-2">{booking.service_type}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                              </div>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-accent">
                              ₹{booking.price}
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleBookingAction(booking.id, "view")}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Profile */}
              <TabsContent value="profile" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary">Profile Information</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditingProfile ? "Cancel" : "Edit"}
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-accent-gradient rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-accent-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-primary">
                            {user?.firstName} {user?.lastName}
                          </h3>
                          <p className="text-muted-foreground">Pet Owner</p>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-primary">Email</p>
                            <p className="text-sm text-muted-foreground">
                              {user?.emailAddresses[0]?.emailAddress}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-primary">Phone</p>
                            <p className="text-sm text-muted-foreground">
                              {user?.phoneNumbers[0]?.phoneNumber || "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-primary">Role</p>
                            <p className="text-sm text-muted-foreground">
                              {profile?.role?.toUpperCase() || 'USER'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {isEditingProfile && (
                        <div className="pt-4 border-t">
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-primary">Name</label>
                              <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-primary">Phone</label>
                              <input
                                type="text"
                                value={profileData.phone}
                                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                              />
                            </div>
                            <Button 
                              onClick={handleProfileUpdate}
                              disabled={isUpdating}
                              className="w-full"
                            >
                              {isUpdating ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Updating...
                                </>
                              ) : (
                                'Update Profile'
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;