import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters,
  isMobile = false 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    dietary: true,
    category: true,
    brand: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const priceRanges = [
    { id: 'under-200', label: 'Under ₹200', min: 0, max: 200 },
    { id: '200-500', label: '₹200 - ₹500', min: 200, max: 500 },
    { id: '500-1000', label: '₹500 - ₹1000', min: 500, max: 1000 },
    { id: 'above-1000', label: 'Above ₹1000', min: 1000, max: 99999 }
  ];

  const dietaryOptions = [
    { id: 'vegan', label: 'Vegan', count: 45 },
    { id: 'gluten-free', label: 'Gluten Free', count: 32 },
    { id: 'no-preservatives', label: 'No Preservatives', count: 78 },
    { id: 'organic', label: 'Organic', count: 56 },
    { id: 'handmade', label: 'Handmade', count: 89 },
    { id: 'no-palm-oil', label: 'No Palm Oil', count: 67 }
  ];

  const categories = [
    { id: 'unpolished-pulses-dals-rice', label: 'Unpolished Pulses, Dals & Rice', count: 15 },
    { id: 'poha-aval', label: 'Poha / Aval', count: 3 },
    { id: 'sugars-honey', label: 'Sugars & Honey', count: 6 },
    { id: 'haircare-products', label: 'Haircare Products', count: 12 },
    { id: 'skincare-products', label: 'Skincare Products', count: 8 },
    { id: 'millet-items', label: 'Millet Items', count: 10 },
    { id: 'powders', label: 'Powders', count: 10 },
    { id: 'fries', label: 'Fries', count: 7 },
    { id: 'herbal-handmade-soaps', label: 'Herbal Handmade Soaps', count: 20 },
    { id: 'snacks', label: 'Snacks', count: 25 },
    { id: 'herbal-products', label: 'Herbal Products', count: 30 },
    { id: 'herbal-powders', label: 'Herbal Powders', count: 25 }
  ];

  const brands = [
    { id: 'neenus-natural', label: "Neenu\'s Natural", count: 156 },
    { id: 'traditional-tastes', label: 'Traditional Tastes', count: 45 },
    { id: 'organic-origins', label: 'Organic Origins', count: 32 },
    { id: 'homemade-heritage', label: 'Homemade Heritage', count: 28 }
  ];

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-2 font-heading font-semibold text-foreground hover:text-primary transition-colors duration-200"
      >
        <span>{title}</span>
        <Icon 
          name={expandedSections?.[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={16} 
        />
      </button>
      {expandedSections?.[sectionKey] && (
        <div className="mt-3 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Filters
        </h2>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>

      {/* Active Filters Count */}
      {(filters?.priceRange?.length > 0 || filters?.dietary?.length > 0 || filters?.categories?.length > 0 || filters?.brands?.length > 0) && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-primary font-medium">
              {filters?.priceRange?.length + filters?.dietary?.length + filters?.categories?.length + filters?.brands?.length} filters applied
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-primary hover:text-primary/80"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}

      {/* Price Range */}
      <FilterSection title="Price Range" sectionKey="price">
        {priceRanges?.map((range) => (
          <Checkbox
            key={range?.id}
            label={range?.label}
            checked={filters?.priceRange?.includes(range?.id)}
            onChange={(e) => {
              const newPriceRange = e?.target?.checked
                ? [...filters?.priceRange, range?.id]
                : filters?.priceRange?.filter(id => id !== range?.id);
              onFilterChange('priceRange', newPriceRange);
            }}
          />
        ))}
      </FilterSection>

      {/* Dietary Preferences */}
      <FilterSection title="Dietary & Features" sectionKey="dietary">
        {dietaryOptions?.map((option) => (
          <div key={option?.id} className="flex items-center justify-between">
            <Checkbox
              label={option?.label}
              checked={filters?.dietary?.includes(option?.id)}
              onChange={(e) => {
                const newDietary = e?.target?.checked
                  ? [...filters?.dietary, option?.id]
                  : filters?.dietary?.filter(id => id !== option?.id);
                onFilterChange('dietary', newDietary);
              }}
            />
            <span className="font-caption text-xs text-muted-foreground">
              ({option?.count})
            </span>
          </div>
        ))}
      </FilterSection>

      {/* Categories */}
      <FilterSection title="Categories" sectionKey="category">
        {categories?.map((category) => (
          <div key={category?.id} className="flex items-center justify-between">
            <Checkbox
              label={category?.label}
              checked={filters?.categories?.includes(category?.id)}
              onChange={(e) => {
                const newCategories = e?.target?.checked
                  ? [...filters?.categories, category?.id]
                  : filters?.categories?.filter(id => id !== category?.id);
                onFilterChange('categories', newCategories);
              }}
            />
            <span className="font-caption text-xs text-muted-foreground">
              ({category?.count})
            </span>
          </div>
        ))}
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands" sectionKey="brand">
        {brands?.map((brand) => (
          <div key={brand?.id} className="flex items-center justify-between">
            <Checkbox
              label={brand?.label}
              checked={filters?.brands?.includes(brand?.id)}
              onChange={(e) => {
                const newBrands = e?.target?.checked
                  ? [...filters?.brands, brand?.id]
                  : filters?.brands?.filter(id => id !== brand?.id);
                onFilterChange('brands', newBrands);
              }}
            />
            <span className="font-caption text-xs text-muted-foreground">
              ({brand?.count})
            </span>
          </div>
        ))}
      </FilterSection>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-[1002]" onClick={onClose} />
        )}
        <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-card shadow-warm-xl z-[1003] transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full overflow-y-auto p-6">
            {sidebarContent}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full bg-card rounded-lg border border-border p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;