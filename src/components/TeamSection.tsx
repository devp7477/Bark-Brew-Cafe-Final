import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award } from "lucide-react";
import team1 from "/images/team1.jpg";
import team2 from "/images/team2.jpg";
import team3 from "/images/team3.jpg";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Priya Sharma",
      role: "Lead Veterinarian",
      specialty: "Pet Health & Grooming",
      image: team1,
      rating: 4.9,
      badge: "Certified Vet",
      bio: "10+ years of experience in pet care and veterinary medicine. Passionate about creating safe spaces for pets.",
    },
    {
      name: "Amit Verma",
      role: "Head Barista",
      specialty: "Coffee & Customer Service",
      image: team2,
      rating: 4.8,
      badge: "Coffee Expert",
      bio: "Award-winning barista with a love for both coffee and animals. Creates the perfect café atmosphere.",
    },
    {
      name: "Sneha Patel",
      role: "Pet Care Specialist",
      specialty: "Animal Behavior & Training",
      image: team3,
      rating: 4.9,
      badge: "Animal Trainer",
      bio: "Certified animal behaviorist ensuring every pet feels comfortable and happy in our space.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our passionate team of professionals is dedicated to providing the best experience for you and your pets
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="card-float group overflow-hidden border-card-border text-center">
              <div className="relative">
                <div className="w-32 h-32 mx-auto mt-8 mb-6 rounded-full overflow-hidden border-4 border-accent/20 group-hover:border-accent/40 transition-colors">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    <Award className="w-3 h-3 mr-1" />
                    {member.badge}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="px-6 pb-8">
                <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                <p className="text-secondary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.specialty}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(member.rating)
                            ? "text-accent fill-current"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-dark">{member.rating}</span>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;