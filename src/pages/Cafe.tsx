import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Filter } from "lucide-react";
import masalaChai from "/images/masala-chai.jpg";
import samosa from "/images/samosa.jpg";
import paneerTikka from "/images/paneer-tikka.jpg";
import vadaPav from "/images/vada-pav.jpg";
import gulabJamun from "/images/gulab-jamun.jpg";
import coldCoffee from "/images/cold-coffee.jpg";
import heroCafe from "/images/hero-cafe.jpg";
import cafeExperience from "/images/cafe-experience.jpg";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  popular?: boolean;
}

const Cafe = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Masala Chai",
      description: "Traditional Indian spiced tea served hot",
      price: 80,
      image: masalaChai || cafeExperience,
      category: "drinks",
      rating: 4.8,
      popular: true
    },
    {
      id: 2,
      name: "Samosa",
      description: "Crispy pastry filled with spicy potatoes and peas",
      price: 50,
      image: samosa || heroCafe,
      category: "food",
      rating: 4.7
    },
    {
      id: 3,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese cubes marinated in spices",
      price: 180,
      image: paneerTikka || cafeExperience,
      category: "food",
      rating: 4.9,
      popular: true
    },
    {
      id: 4,
      name: "Vada Pav",
      description: "Mumbai's favorite spicy potato fritter in a bun",
      price: 40,
      image: vadaPav || heroCafe,
      category: "food",
      rating: 4.6
    },
    {
      id: 5,
      name: "Gulab Jamun",
      description: "Soft milk-solid balls soaked in rose-flavored syrup",
      price: 60,
      image: gulabJamun || cafeExperience,
      category: "treats",
      rating: 4.8
    },
    {
      id: 6,
      name: "Cold Coffee",
      description: "Chilled coffee with ice cream and chocolate syrup",
      price: 120,
      image: coldCoffee || heroCafe,
      category: "drinks",
      rating: 4.5
    }
  ];

  const categories = [
    { id: "all", name: "All Items" },
    { id: "coffee", name: "Coffee" },
    { id: "food", name: "Food" },
    { id: "drinks", name: "Drinks" },
    { id: "treats", name: "Treats" }
  ];

  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-warm-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-coffee-dark mb-4">
              Café Menu
            </h1>
            <p className="text-lg text-coffee-medium max-w-2xl mx-auto">
              Enjoy premium coffee and delicious food while your pets play in our pet-friendly café
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Filter by:</span>
              </div>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <Card key={item.id} className="card-float overflow-hidden">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full aspect-square object-cover object-center rounded-lg"
                    />
                    {item.popular && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-primary">{item.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-energy text-energy" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold text-accent">
                        ₹{item.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cafe;