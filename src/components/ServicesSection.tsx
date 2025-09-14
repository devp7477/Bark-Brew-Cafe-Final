import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Scissors, PlayCircle, ArrowRight, TrendingUp, Users, Heart, Calendar, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import cafeImage from "/images/cafe-experience.jpg";
import groomingImage from "/images/pet-grooming.jpg";
import playgroundImage from "/images/pet-playground.jpg";

const ServicesSection = () => {
  const services = [
    {
      title: "Café Experience",
      description: "Enjoy premium coffee and pastries while your pets socialize in our comfortable, pet-friendly environment.",
      image: cafeImage,
      icon: Coffee,
      features: ["Premium Coffee", "Pet-Friendly Space", "Fresh Pastries", "Cozy Atmosphere"],
    },
    {
      title: "Pet Grooming",
      description: "Professional grooming services by certified experts who treat your pets with love and care.",
      image: groomingImage,
      icon: Scissors,
      features: ["Professional Grooming", "Certified Experts", "Safe Products", "Personalized Care"],
    },
    {
      title: "Pet Playground",
      description: "A safe, supervised play area where pets can exercise, socialize, and have fun with other furry friends.",
      image: playgroundImage,
      icon: PlayCircle,
      features: ["Safe Play Area", "Supervised Fun", "Social Activities", "Exercise Equipment"],
    },
  ];

  const stats = [
    { number: "2,500+", label: "Furry Friends Groomed", icon: Heart },
    { number: "98%", label: "Customer Satisfaction", icon: TrendingUp },
    { number: "50+", label: "Daily Visitors", icon: Users },
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            From premium coffee to professional pet care, we provide everything your furry friends need
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {services.map((service, index) => (
            <Card key={index} className="card-float group overflow-hidden border-card-border">
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 p-2 sm:p-3 bg-accent/90 rounded-lg backdrop-blur-sm">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
                </div>
              </div>
              
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs sm:text-sm text-muted-dark">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {index === 0 ? (
                  <Link to="/cafe">
                    <Button variant="outline" className="w-full group touch-manipulation">
                      <span className="text-sm sm:text-base">Explore Menu</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/booking">
                    <Button variant="outline" className="w-full group touch-manipulation">
                      <span className="text-sm sm:text-base">{index === 1 ? "Book Grooming" : "Reserve Playtime"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-nature-gradient rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary-foreground mb-6 sm:mb-8">
            Trusted by Pet Lovers
          </h3>
          
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="p-3 sm:p-4 bg-secondary-foreground/10 rounded-lg mb-3 sm:mb-4">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-foreground" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-secondary-foreground mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-secondary-foreground/80 text-center">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/booking" className="w-full xs:w-auto">
              <Button variant="book" size="lg" className="w-full xs:min-w-48 touch-manipulation">
                <Calendar className="w-4 h-4" />
                <span className="text-sm sm:text-base">Book Appointment</span>
              </Button>
            </Link>
            <Link to="/pet-shop" className="w-full xs:w-auto">
              <Button variant="warm" size="lg" className="w-full xs:min-w-48 touch-manipulation">
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm sm:text-base">Visit Pet Shop</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;