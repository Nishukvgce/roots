import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../AppImage';

const MegaMenu = ({ isOpen, onClose }) => {
  const categories = [
    {
      title: 'Food Items',
      items: [
        { name: 'Unpolished Pulses, Dals & Rice', path: '/product-collection-grid?category=unpolished-pulses-dals-rice' },
        { name: 'Poha / Aval', path: '/product-collection-grid?category=poha-aval' },
        { name: 'Sugars & Honey', path: '/product-collection-grid?category=sugars-honey' },
        { name: 'Millet Items', path: '/product-collection-grid?category=millet-items' }
      ],
      image: '/assets/images/category-food.jpg'
    },
    {
      title: 'Spices & Powders',
      items: [
        { name: 'Powders', path: '/product-collection-grid?category=powders' },
        { name: 'Herbal Powders', path: '/product-collection-grid?category=herbal-powders' },
        { name: 'Fries', path: '/product-collection-grid?category=fries' }
      ],
      image: '/assets/images/category-spices.jpg'
    },
    {
      title: 'Personal Care',
      items: [
        { name: 'Haircare Products', path: '/product-collection-grid?category=haircare-products' },
        { name: 'Skincare Products', path: '/product-collection-grid?category=skincare-products' },
        { name: 'Herbal Handmade Soaps', path: '/product-collection-grid?category=herbal-handmade-soaps' }
      ],
      image: '/assets/images/category-personal-care.jpg'
    },
    {
      title: 'Health & Wellness',
      items: [
        { name: 'Herbal Products', path: '/product-collection-grid?category=herbal-products' },
        { name: 'Snacks', path: '/product-collection-grid?category=snacks' }
      ],
      image: '/assets/images/category-health.jpg'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[1001] lg:hidden"
        onClick={onClose}
      />
      {/* Mega Menu Content */}
      <div className="absolute top-full left-0 w-full bg-card shadow-warm-lg border-t border-border z-[1002] lg:relative lg:shadow-warm-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories?.map((category, index) => (
              <div key={index} className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={category?.image}
                    alt={category?.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    {category?.title}
                  </h3>
                  <ul className="space-y-2">
                    {category?.items?.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          to={item?.path}
                          onClick={onClose}
                          className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block py-1"
                        >
                          {item?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          {/* Featured Section */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-col lg:flex-row items-center justify-between bg-muted rounded-lg p-6">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                  New Arrivals
                </h4>
                <p className="font-body text-muted-foreground">
                  Discover our latest collection of premium natural products
                </p>
              </div>
              <Link
                to="/product-collection-grid?filter=new-arrivals"
                onClick={onClose}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-caption font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenu;