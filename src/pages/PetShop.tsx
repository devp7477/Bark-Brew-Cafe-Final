import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Filter, Heart, Search, ShoppingCart } from "lucide-react";
import { categories, products, Product } from "@/data/petShopData";

const PetShop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Filter and search products with memoization
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "name":
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const getProductImage = (product: Product) => {
    // Use the actual product image path
    return product.image;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-nature-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-foreground mb-4">
              Pet Shop
            </h1>
            <p className="text-lg text-nature-dark max-w-2xl mx-auto">
              Everything your furry friend needs for a happy and healthy life
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Filter by:</span>
                </div>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "nature" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="text-sm"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Count */}
        <section className="py-4 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
              {selectedCategory !== "all" && (
                <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
              )}
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="card-float overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img 
                        src={getProductImage(product)} 
                        alt={product.name}
                        className="w-full aspect-square object-cover object-center rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.bestseller && (
                        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                          Bestseller
                        </Badge>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-3 right-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-semibold text-primary line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 ml-2">
                            <Star className="w-4 h-4 fill-energy text-energy" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                        </div>
                        
                        {product.brand && (
                          <p className="text-xs text-muted-foreground font-medium">
                            {product.brand}
                          </p>
                        )}
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-accent">
                            ₹{product.price}
                          </span>
                          <Button 
                            size="sm" 
                            className="bg-nature hover:bg-nature/90"
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PetShop;