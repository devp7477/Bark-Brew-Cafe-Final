import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Award, Coffee, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "/images/hero-cafe.jpg";

const HeroSection = () => {
  const stats = [
    { number: "500+", label: "Happy Pets", icon: Users },
    { number: "4.9★", label: "Rating", icon: Star },
    { number: "3+", label: "Years", icon: Award },
  ];

  const floatingCards = [
    { title: "Fresh Coffee", description: "Locally sourced beans", position: "top-20 left-10" },
    { title: "Pet Care Professional", description: "Certified experts", position: "top-32 right-10" },
    { title: "Safe Environment", description: "Pet-friendly space", position: "bottom-20 left-16" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Pets enjoying coffee at Bark & Brew"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark/85 via-coffee-dark/70 to-coffee-dark/40 sm:from-coffee-dark/80 sm:via-coffee-dark/60 sm:to-transparent"></div>
      </div>

      {/* Floating Info Cards - Hidden on mobile */}
      {floatingCards.map((card, index) => (
        <Card key={index} className={`absolute hidden lg:block ${card.position} card-float bg-card/90 backdrop-blur-sm max-w-48`}>
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm text-primary mb-1">{card.title}</h4>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-accent via-energy-medium to-secondary bg-clip-text text-transparent">
              Where Pets Meet
            </span>
            <br />
            <span className="text-primary-foreground">Perfect Coffee</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Experience the perfect blend of premium coffee and professional pet care. 
            Your furry friends deserve the best, and so do you.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-2">
          <Link to="/cafe" className="w-full xs:w-auto">
            <Button variant="hero" size="lg" className="w-full xs:min-w-48 touch-manipulation">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Visit Our Café</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
          <Link to="/booking" className="w-full xs:w-auto">
            <Button variant="nature" size="lg" className="w-full xs:min-w-48 touch-manipulation">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Book Pet Services</span>
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-col xs:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-2 sm:space-x-3 text-primary-foreground">
              <div className="p-2 sm:p-3 bg-accent/20 rounded-lg backdrop-blur-sm">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">{stat.number}</div>
                <div className="text-xs sm:text-sm opacity-90">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;