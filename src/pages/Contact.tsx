import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useBusinessInfo } from "@/hooks/useBusinessInfo";
import { useContactMessages } from "@/hooks/useContactMessages";

const Contact = () => {
  const { toast } = useToast();
  const { businessInfo, isLoading } = useBusinessInfo();
  const { createContactMessage, isCreating } = useContactMessages();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        inquiry_type: formData.inquiryType,
      });

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: businessInfo?.phone || "+91 79 1234 5678",
      subtitle: "Call us anytime during business hours",
      color: "bg-accent-gradient"
    },
    {
      icon: Mail,
      title: "Email",
      content: businessInfo?.email || "hello@barkandbrew.com",
      subtitle: "We respond within 24 hours",
      color: "bg-nature-gradient"
    },
    {
      icon: MapPin,
      title: "Address",
      content: `${businessInfo?.address || "Sector 17, Gandhinagar"}, ${businessInfo?.state || "Gujarat"} ${businessInfo?.postal_code || "382017"}`,
      subtitle: "Gandhinagar Pet-Friendly Zone",
      color: "bg-warm-gradient"
    },
    {
      icon: Clock,
      title: "Hours",
      content: businessInfo?.business_hours || "Mon-Sun: 7AM - 8PM",
      subtitle: "Extended weekend hours available",
      color: "bg-accent-gradient"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-gradient-to-br from-accent/10 to-nature/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our services? Want to book an appointment? We'd love to hear from you!
            </p>
          </div>
        </section>

        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-accent" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="text-mobile"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="text-mobile"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+91 79 1234 5678"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="text-mobile"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiry-type">Inquiry Type</Label>
                        <Select onValueChange={(value) => handleInputChange("inquiryType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Information</SelectItem>
                            <SelectItem value="booking">Booking Inquiry</SelectItem>
                            <SelectItem value="grooming">Pet Grooming</SelectItem>
                            <SelectItem value="cafe">Café Services</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" variant="book" size="lg" className="w-full" disabled={isCreating}>
                      <Send className="w-4 h-4" />
                      {isCreating ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    We're here to help! Reach out to us through any of these channels and we'll get back to you as soon as possible.
                  </p>
                </div>

                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="card-float">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg ${info.color} flex items-center justify-center shadow-medium`}>
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-primary mb-1">{info.title}</h3>
                            <p className="font-medium text-foreground mb-1">{info.content}</p>
                            <p className="text-sm text-muted-foreground mb-3">{info.subtitle}</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (info.title === "Phone") {
                                  navigator.clipboard.writeText(businessInfo?.phone || "+91 79 1234 5678").then(() => {
                                    toast({
                                      title: "Phone Number Copied!",
                                      description: `Phone number copied to clipboard: ${businessInfo?.phone || "+91 79 1234 5678"}`,
                                    });
                                  });
                                } else if (info.title === "Email") {
                                  navigator.clipboard.writeText(businessInfo?.email || "hello@barkandbrew.com").then(() => {
                                    toast({
                                      title: "Email Copied!",
                                      description: `Email address copied to clipboard: ${businessInfo?.email || "hello@barkandbrew.com"}`,
                                    });
                                  });
                                } else if (info.title === "Address") {
                                  const address = `${businessInfo?.address || "Sector 17, Gandhinagar"}, ${businessInfo?.state || "Gujarat"} ${businessInfo?.postal_code || "382017"}`;
                                  navigator.clipboard.writeText(address).then(() => {
                                    toast({
                                      title: "Address Copied!",
                                      description: `Address copied to clipboard: ${address}`,
                                    });
                                  });
                                } else if (info.title === "Hours") {
                                  toast({
                                    title: "Business Hours",
                                    description: "Monday-Sunday: 7:00 AM - 8:00 PM. Extended weekend hours available!",
                                  });
                                }
                              }}
                            >
                              {info.title === "Phone" && "Copy Phone"}
                              {info.title === "Email" && "Copy Email"}
                              {info.title === "Address" && "Copy Address"}
                              {info.title === "Hours" && "View Schedule"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Map Placeholder */}
                <Card className="overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-nature/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-accent mx-auto mb-4" />
                      <p className="text-lg font-medium text-primary">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">Find us in the heart of Gandhinagar's pet-friendly district</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;