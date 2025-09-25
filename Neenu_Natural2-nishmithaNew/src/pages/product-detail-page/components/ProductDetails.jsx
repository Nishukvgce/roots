import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductDetails = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'ingredients', label: 'Ingredients', icon: 'List' },
    { id: 'nutrition', label: 'Nutrition', icon: 'Activity' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center gap-2 px-4 py-3 font-body font-medium transition-colors duration-200 border-b-2 ${
              activeTab === tab?.id
                ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Product Description
            </h3>
            <div className="font-body text-muted-foreground space-y-3">
              <p>{product?.description}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {product?.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Ingredients
            </h3>
            <div className="space-y-3">
              <p className="font-body text-muted-foreground">
                {product?.ingredients?.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-body font-medium text-foreground mb-2">
                    Primary Ingredients:
                  </h4>
                  <ul className="space-y-1">
                    {product?.ingredients?.primary?.map((ingredient, index) => (
                      <li key={index} className="font-caption text-sm text-muted-foreground">
                        • {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-body font-medium text-foreground mb-2">
                    Spices & Seasonings:
                  </h4>
                  <ul className="space-y-1">
                    {product?.ingredients?.spices?.map((spice, index) => (
                      <li key={index} className="font-caption text-sm text-muted-foreground">
                        • {spice}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Nutritional Information
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-caption text-sm text-muted-foreground mb-4">
                Per 100g serving
              </p>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product?.nutrition)?.map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-body text-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                    </span>
                    <span className="font-data font-medium text-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Shipping Information
            </h3>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="font-body font-medium text-foreground">
                    Bengaluru
                  </span>
                </div>
                <p className="font-caption text-sm text-muted-foreground">
                  Free shipping on orders above ₹499
                </p>
                <p className="font-caption text-sm text-muted-foreground">
                  Delivery in 1-2 business days
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-secondary" />
                  <span className="font-body font-medium text-foreground">
                    Other Cities
                  </span>
                </div>
                <p className="font-caption text-sm text-muted-foreground">
                  Free shipping on orders above ₹999
                </p>
                <p className="font-caption text-sm text-muted-foreground">
                  Delivery in 3-5 business days
                </p>
              </div>

              <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="font-caption text-sm text-success font-medium">
                  Cash on Delivery Available
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;