import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, PawPrint, User, Phone, Mail, Loader2, CheckCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useBookings } from "@/hooks/useBookings";
import { getServices } from "@/lib/database";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

const Booking = () => {
  const { user } = useUser();
  const { profile, createProfile } = useUserProfile();
  const { createBooking, isCreating } = useBookings();
  
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    petBreed: "",
    bookingDate: "",
    bookingTime: "",
    notes: "",
    phone: "",
  });

  // Load services
  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setIsLoadingServices(false);
      }
    };

    loadServices();
  }, []);

  // Create user profile if it doesn't exist
  useEffect(() => {
    if (user && !profile) {
      createProfile({
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.firstName || "",
        phone: user.phoneNumbers[0]?.phoneNumber || "",
        role: 'user'
      });
    }
  }, [user, profile, createProfile]);

  const handleServiceSelect = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    setSelectedService(service || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !user) return;

    setIsBooking(true);
    setBookingSuccess(false);

    try {
      await createBooking({
        user_id: user.id,
        service_type: selectedService.name,
        pet_name: formData.petName,
        pet_type: formData.petType,
        pet_breed: formData.petBreed,
        booking_date: formData.bookingDate,
        booking_time: formData.bookingTime,
        notes: formData.notes,
        phone: formData.phone,
        price: selectedService.price,
        status: 'pending'
      });

      setBookingSuccess(true);
      setFormData({
        petName: "",
        petType: "",
        petBreed: "",
        bookingDate: "",
        bookingTime: "",
        notes: "",
        phone: "",
      });
      setSelectedService(null);
    } catch (error) {
      console.error('Failed to create booking:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (isLoadingServices) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-muted-foreground">Loading services...</p>
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
                Book Pet Care Services
              </h1>
              <p className="text-lg text-coffee-medium max-w-2xl mx-auto">
                Schedule professional care for your beloved pets
              </p>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {bookingSuccess && (
              <Card className="mb-8 border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Booking Successful!</h3>
                      <p className="text-green-700">Your booking has been submitted and will be confirmed soon.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Services Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PawPrint className="w-5 h-5" />
                    Available Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedService?.id === service.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-primary">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {service.duration} min
                            </span>
                            <span className="bg-gray-100 px-2 py-1 rounded">{service.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-accent">₹{service.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Booking Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Booking Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedService ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Selected Service Summary */}
                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <h3 className="font-semibold text-primary">{selectedService.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedService.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-muted-foreground">
                            Duration: {selectedService.duration} minutes
                          </span>
                          <span className="text-lg font-bold text-accent">₹{selectedService.price}</span>
                        </div>
                      </div>

                      {/* Pet Information */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-primary">Pet Information</h4>
                        
                        <div>
                          <Label htmlFor="petName">Pet Name *</Label>
                          <Input
                            id="petName"
                            name="petName"
                            value={formData.petName}
                            onChange={handleInputChange}
                            placeholder="Enter your pet's name"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="petType">Pet Type *</Label>
                          <Select
                            value={formData.petType}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, petType: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select pet type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dog">Dog</SelectItem>
                              <SelectItem value="cat">Cat</SelectItem>
                              <SelectItem value="bird">Bird</SelectItem>
                              <SelectItem value="rabbit">Rabbit</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="petBreed">Pet Breed</Label>
                          <Input
                            id="petBreed"
                            name="petBreed"
                            value={formData.petBreed}
                            onChange={handleInputChange}
                            placeholder="Enter your pet's breed"
                          />
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-primary">Contact Information</h4>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 79 1234 5678"
                            required
                          />
                        </div>
                      </div>

                      {/* Booking Schedule */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-primary">Schedule</h4>
                        
                        <div>
                          <Label htmlFor="bookingDate">Booking Date *</Label>
                          <Input
                            id="bookingDate"
                            name="bookingDate"
                            type="date"
                            value={formData.bookingDate}
                            onChange={handleInputChange}
                            min={getMinDate()}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="bookingTime">Booking Time *</Label>
                          <Input
                            id="bookingTime"
                            name="bookingTime"
                            type="time"
                            value={formData.bookingTime}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Any special instructions or notes for our staff..."
                          rows={3}
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isBooking || isCreating}
                      >
                        {isBooking || isCreating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating Booking...
                          </>
                        ) : (
                          'Book Service'
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <PawPrint className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">Select a Service</h3>
                      <p className="text-muted-foreground">Choose a service from the left to start your booking.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;