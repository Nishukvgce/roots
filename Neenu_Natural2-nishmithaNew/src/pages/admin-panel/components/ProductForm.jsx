  import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/api';
import { X } from 'lucide-react';
import dataService from '../../../services/dataService';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    weight: '',
    stockQuantity: '',
    ingredients: '',
    benefits: '',
    inStock: true
  });
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resolveImageUrl = (candidate) => {
    if (!candidate) return '';
    if (candidate.startsWith('http://') || candidate.startsWith('https://') || candidate.startsWith('data:')) {
      return candidate;
    }
    const base = apiClient?.defaults?.baseURL || '';
    return candidate.startsWith('/') ? `${base}${candidate}` : `${base}/${candidate}`;
  };

  useEffect(() => {
    if (product && typeof product === 'object') {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price ? product.price.toString() : '',
        originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
        category: product.category ? (product.category.id || product.category) : '',
        subcategory: product.subcategory || '',
        weight: product.weight || '',
        stockQuantity: product.stockQuantity ? product.stockQuantity.toString() : '',
        ingredients: product.ingredients || '',
        benefits: product.benefits || '',
        inStock: typeof product.inStock === 'boolean' ? product.inStock : true
      });
      // Keep the original image URL for preview/preserve during update
      const original = product.imageUrl || product.image || product.thumbnailUrl;
      setExistingImageUrl(resolveImageUrl(original || ''));
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        subcategory: '',
        weight: '',
        stockQuantity: '',
        ingredients: '',
        benefits: '',
        inStock: true
      });
      setExistingImageUrl('');
    }
  }, [product]);

  // Compress image before upload
  const compressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  // Handle image file selection
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Check file size (limit to 5MB before compression)
        if (file.size > 5 * 1024 * 1024) {
          setError('Image file is too large. Please select an image smaller than 5MB.');
          return;
        }
        
        // Compress image if it's larger than 500KB
        if (file.size > 500 * 1024) {
          console.log('Compressing image from', (file.size / 1024).toFixed(2), 'KB');
          const compressedFile = await compressImage(file);
          const compressedFileObject = new File([compressedFile], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          console.log('Compressed to', (compressedFileObject.size / 1024).toFixed(2), 'KB');
          setImageFile(compressedFileObject);
        } else {
          setImageFile(file);
        }
      } catch (error) {
        console.error('Error processing image:', error);
        setError('Error processing image. Please try again.');
      }
    }
  };

  useEffect(() => {
    // Fetch categories from backend
    async function fetchCategories() {
      try {
        const res = await dataService.getCategories();
        setCategories(res.data || res); // support both axios/fetch or mock
      } catch (err) {
        setError('Failed to load categories');
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.name || !formData.description || !formData.price || !formData.originalPrice || !formData.category || !formData.weight || !formData.stockQuantity || (!product && !imageFile)) {
      setError('Please fill all required fields' + (!product ? ' and select an image.' : '.'));
      setLoading(false);
      return;
    }

    try {
      const productData = {
        ...formData,
        category: formData.category,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        stockQuantity: parseInt(formData.stockQuantity),
        ingredients: formData.ingredients,
        benefits: formData.benefits,
        inStock: !!formData.inStock,
        rating: product?.rating || 4.5,
        reviewCount: product?.reviewCount || 0,
        badges: product?.badges || []
      };

      if (product) {
        // Edit mode: update product
        if (imageFile) {
          // If new image is uploaded, use FormData for update
          const form = new FormData();
          form.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
          form.append('image', imageFile);
          await dataService.updateProductWithImage(product.id, form);
        } else {
          // Preserve existing imageUrl if no new image is uploaded
          if (product?.imageUrl) {
            productData.imageUrl = product.imageUrl;
          }
          await dataService.updateProduct(product.id, productData);
        }
      } else {
        // Add mode: use FormData for image upload
        const form = new FormData();
        form.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
        form.append('image', imageFile);
        await dataService.addProduct(form, true);
      }
      onSave();
    } catch (err) {
      console.error('Error saving product:', err);
      
      // Handle specific error types
      if (err.message?.includes('413') || err.message?.includes('Content Too Large') || err.message?.includes('MaxUploadSizeExceededException')) {
        setError('Image file is too large. Please select a smaller image or try compressing it further.');
      } else if (err.message?.includes('Network Error') || err.message?.includes('ERR_NETWORK')) {
        setError('Network connection error. Please check your connection and try again.');
      } else if (err.message?.includes('500')) {
        setError('Server error. Please try again later or contact support.');
      } else {
        setError(err.message || 'Failed to save product. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-bold text-foreground">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Product Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Weight/Size *
              </label>
              <Input
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                placeholder="e.g., 500ml, 250g"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Description * (You can include features here)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              placeholder="Enter product description and features. You can add 'Key Features:' followed by your feature list."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tip: Add features by writing "Key Features:" followed by your features in separate lines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Price *
              </label>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Original Price
              </label>
              <Input
                name="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Stock Quantity *
              </label>
              <Input
                name="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
                disabled={categories.length === 0}
              >
                <option value="">{categories.length === 0 ? 'Loading categories...' : 'Select Category'}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Subcategory
              </label>
              <Input
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                placeholder="Enter subcategory"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Product Image
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {/* Show selected image preview; else show existing image when editing */}
              {imageFile ? (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                </div>
              ) : (
                product && existingImageUrl && (
                  <div className="mt-2">
                    <img
                      src={existingImageUrl}
                      alt="Current product image"
                      className="w-20 h-20 object-cover rounded-md border"
                      onError={(e) => { e.currentTarget.src = '/assets/images/no_image.png'; }}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Ingredients (comma-separated)
            </label>
            <Input
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Organic coconut, Sea salt, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Benefits (comma-separated)
            </label>
            <Input
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="Rich in vitamins, Natural antioxidants, etc."
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="w-4 h-4 text-primary border-border rounded"
            />
            <label className="text-sm font-medium text-foreground">
              In Stock
            </label>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;