import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CategoryTiles from './components/CategoryTiles';
import BestsellersCarousel from './components/BestsellersCarousel';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

import { useCart } from '../../contexts/CartContext';

const Homepage = () => {
  const { addToCart, getCartItemCount, cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock cart data for demonstration
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "Traditional Mysore Pak",
        price: 399,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop",
        variant: "250g",
        quantity: 2
      },
      {
        id: 2,
        name: "Homemade Mango Pickle",
        price: 280,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
        variant: "500g",
        quantity: 1
      }
    ];
    // The original code had setCartItems(mockCartItems) here which would be incorrect if CartContext doesn't manage initial state this way.
    // Assuming addToCart handles adding items and the context maintains the state.
    // If initial cart state is needed, it should be handled within CartContext.
  }, []);

  const handleAddToCart = (product) => {
    const cartItem = {
      id: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.image,
      variant: 'Default',
      category: product.category,
      brand: product.brand
    };
    addToCart(cartItem, 1);
    console.log('Added to cart:', cartItem);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Navigate to product collection with search query
    window.location.href = `/product-collection-grid?search=${encodeURIComponent(query)}`;
  };

  return (
    <>
      <Helmet>
        <title>Neenu's Natural - Premium Natural & Handmade Food Products</title>
        <meta
          name="description"
          content="Discover authentic Indian flavors with Neenu's Natural premium handmade food products. From traditional sweets to organic spices, experience pure natural taste with free shipping on orders above ₹499."
        />
        <meta name="keywords" content="natural food products, handmade sweets, organic spices, traditional pickles, pure ghee, Indian food, authentic flavors, chemical-free, preservative-free" />
        <meta property="og:title" content="Neenu's Natural - Premium Natural & Handmade Food Products" />
        <meta property="og:description" content="Discover authentic Indian flavors with premium handmade food products. Free shipping on orders above ₹499." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://neenusnatural.com/homepage" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Neenu's Natural - Premium Natural Food Products" />
        <meta name="twitter:description" content="Authentic Indian flavors, handmade with love. Free shipping on orders above ₹499." />
        <link rel="canonical" href="https://neenusnatural.com/homepage" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header
          cartItemCount={getCartItemCount()}
          isLoggedIn={false}
          onSearch={handleSearch}
          cartItems={cartItems}
        />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Category Tiles */}
          <CategoryTiles />

          {/* Bestsellers Carousel */}
          <BestsellersCarousel onAddToCart={handleAddToCart} />

          {/* Newsletter Section */}
          <NewsletterSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Homepage;