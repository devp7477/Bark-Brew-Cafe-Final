import { Button } from "@/components/ui/button";
import { Coffee, Facebook, Instagram, Twitter, Heart, Mail } from "lucide-react";
import { useBusinessInfo } from "@/hooks/useBusinessInfo";

const Footer = () => {
  const { businessInfo } = useBusinessInfo();
  const footerSections = [
    {
      title: "Services",
      links: [
        "Café Experience",
        "Pet Grooming",
        "Pet Playground",
        "Pet Training",
        "Pet Daycare",
      ],
    },
    {
      title: "Quick Links",
      links: [
        "About Us",
        "Our Team",
        "Gallery",
        "Reviews",
        "Careers",
      ],
    },
    {
      title: "Support",
      links: [
        "Contact Us",
        "FAQ",
        "Booking Policy",
        "Pet Care Tips",
        "Emergency Care",
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-accent-gradient rounded-xl">
                  <Coffee className="w-6 h-6 sm:w-7 sm:h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">{businessInfo?.business_name || "Bark & Brew"}</h3>
                  <p className="text-sm text-primary-foreground/70">Café & Pet Care</p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-primary-foreground/80 mb-4 sm:mb-6 leading-relaxed">
                {businessInfo?.description || "Where pets meet perfect coffee. Experience the best pet café and professional care services in the heart of Gandhinagar."}
              </p>
              
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground/70 hover:text-accent hover:bg-primary-foreground/10 touch-manipulation"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">{section.title}</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-sm sm:text-base text-primary-foreground/70 hover:text-accent transition-colors touch-manipulation"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-primary-foreground/10 py-6 sm:py-8">
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6 text-center xs:text-left">
            <div>
              <h5 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Opening Hours</h5>
              <p className="text-xs sm:text-sm text-primary-foreground/70">
                Monday - Sunday<br />
                7:00 AM - 8:00 PM
              </p>
            </div>
            
            <div>
              <h5 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Contact Info</h5>
              <p className="text-xs sm:text-sm text-primary-foreground/70">
                Phone: {businessInfo?.phone || "+91 79 1234 5678"}<br />
                Email: {businessInfo?.email || "hello@barkandbrew.com"}
              </p>
            </div>
            
            <div>
              <h5 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Location</h5>
              <p className="text-xs sm:text-sm text-primary-foreground/70">
                {businessInfo?.address || "Sector 17, Gandhinagar"}<br />
                {businessInfo?.state || "Gujarat"} {businessInfo?.postal_code || "382017"}
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-primary-foreground/10 py-8">
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-accent" />
              Stay Connected
            </h4>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Get updates on special events, new services, and pet care tips
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <Button variant="book" className="sm:w-auto">
                <Mail className="w-4 h-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-primary-foreground/60">
            <p>&copy; 2024 Bark & Brew. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accent transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;