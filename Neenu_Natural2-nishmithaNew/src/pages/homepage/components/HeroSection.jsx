import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const heroData = {
    title: "Pure. Natural. Handmade.",
    subtitle: "Discover authentic Indian flavors crafted with love and traditional recipes",
    description: "From handpicked spices to artisanal sweets, experience the taste of home with our premium natural food products.",
    ctaText: "Shop Now",
    ctaLink: "/product-collection-grid",
    backgroundImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&h=600&fit=crop",
    badge: "Free Shipping on Orders ₹499+"
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="font-caption text-sm font-medium text-primary">
                {heroData?.badge}
              </span>
            </div>
            
            <h1 className="font-heading font-bold text-4xl lg:text-5xl xl:text-6xl text-foreground leading-tight">
              {heroData?.title}
            </h1>
            
            <p className="font-body text-xl lg:text-2xl text-muted-foreground font-medium">
              {heroData?.subtitle}
            </p>
            
            <p className="font-body text-base lg:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              {heroData?.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to={heroData?.ctaLink}>
                <Button 
                  variant="default" 
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  {heroData?.ctaText}
                </Button>
              </Link>
              <Link to="/product-collection-grid?filter=bestsellers">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View Bestsellers
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-warm-xl">
              <Image
                src={heroData?.backgroundImage}
                alt="Natural food products showcase"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-warm-lg hidden lg:block">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="font-caption text-sm font-medium text-foreground">
                  100% Natural
                </span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-warm-lg hidden lg:block">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="font-caption text-sm font-medium text-foreground">
                  Handmade
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;