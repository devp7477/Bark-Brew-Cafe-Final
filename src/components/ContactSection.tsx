import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useBusinessInfo } from "@/hooks/useBusinessInfo";

const ContactSection = () => {
  const { toast } = useToast();
  const { businessInfo, isLoading } = useBusinessInfo();

  const handleContactAction = (action: string, content: string) => {
    switch (action) {
      case "Call Now":
        // Copy phone number to clipboard
        navigator.clipboard.writeText(content).then(() => {
          toast({
            title: "Phone Number Copied!",
            description: `Phone number copied to clipboard: ${content}`,
          });
        });
        break;
      case "Send Email":
        // Open default email app
        window.open(`mailto:${content}`, '_self');
        toast({
          title: "Opening Email App",
          description: "Opening your default email application",
        });
        break;
      case "Get Directions":
        // Open Google Maps with the address
        const encodedAddress = encodeURIComponent(content);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        toast({
          title: "Opening Directions",
          description: "Opening Google Maps with our location",
        });
        break;
      case "View Schedule":
        // Show schedule information
        toast({
          title: "Operating Hours",
          description: "Mon-Sun: 7AM - 8PM (Extended weekend hours)",
        });
        break;
      default:
        break;
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: businessInfo?.phone || "+91 79 1234 5678",
      subtitle: "Call us anytime",
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email",
      content: businessInfo?.email || "hello@barkandbrew.com",
      subtitle: "We'll respond within 24hrs",
      action: "Send Email",
    },
    {
      icon: MapPin,
      title: "Address",
      content: `${businessInfo?.address || "Sector 17, Gandhinagar"}, ${businessInfo?.state || "Gujarat"} ${businessInfo?.postal_code || "382017"}`,
      subtitle: "Gandhinagar Pet-Friendly Zone",
      action: "Get Directions",
    },
    {
      icon: Clock,
      title: "Hours",
      content: businessInfo?.business_hours || "Mon-Sun: 7AM - 8PM",
      subtitle: "Extended weekend hours",
      action: "View Schedule",
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-warm-gradient">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coffee-dark mb-3 sm:mb-4">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-coffee-medium max-w-2xl mx-auto px-2">
            Ready to treat your pet to an amazing experience? Contact us today or visit our café
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="card-float text-center border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-accent-gradient rounded-xl flex items-center justify-center shadow-medium">
                  <info.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent-foreground" />
                </div>
                
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">{info.title}</h3>
                <p className="text-xs sm:text-sm font-medium text-coffee-dark mb-1">{info.content}</p>
                <p className="text-xs text-muted-foreground mb-3 sm:mb-4">{info.subtitle}</p>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full touch-manipulation text-xs sm:text-sm"
                  onClick={() => handleContactAction(info.action, info.content)}
                >
                  {info.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-card/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-center shadow-medium border border-card-border">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-3 sm:mb-4">
              Ready for the Best Pet Café Experience?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2">
              Book your appointment today and discover why pet owners across Gandhinagar choose Bark & Brew. 
              Whether you need professional grooming, want to enjoy great coffee, or just let your pet socialize, 
              we're here to make every visit special.
            </p>
            
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/booking" className="w-full xs:w-auto">
                <Button variant="book" size="lg" className="w-full xs:min-w-56 touch-manipulation">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Book Appointment</span>
                </Button>
              </Link>
              <Link to="/contact" className="w-full xs:w-auto">
                <Button variant="nature" size="lg" className="w-full xs:min-w-56 touch-manipulation">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Contact Us</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;