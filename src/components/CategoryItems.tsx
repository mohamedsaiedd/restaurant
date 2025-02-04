import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Plus, Minus } from 'lucide-react';
import { MenuCategory } from '../types';
import CategoryFilter from './CategoryFilter';
interface CategoryItemsProps {
  categories: MenuCategory[];
  onAddToCart: (categoryId: number, itemId: number, quantity: number) => void;
}

const CategoryItems: React.FC<CategoryItemsProps> = ({ categories, onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = categories.find(c => c.id === Number(id));
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  
  
  const menuTypes = ['Breakfast Menu', 'Lunch Menu', 'Dinner Menu', 'Special Menu', 'Kids Menu', 'Dessert Menu'];
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!category) {
    return <div>Category not found</div>;
  }



  const updateQuantity = (itemId: number, delta: number) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + delta),
    }));
  };

  const toggleWishlist = (itemId: number) => {
    setWishlist(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };
  interface MenuItem {
    id: number
    name: string
    description: string
    price: number
    image: string
    fullDescription: string
  }
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedCategory !== 'all') {
      navigate('/', { state: { selectedFilter: selectedCategory } });
    } else {
      navigate('/');
    }
  };

  // const handleCategorySelect = (category: string) => {
  //   setSelectedCategory(category);
  //   navigate('/', { state: { selectedFilter: category } });
  // };

  return (
    <div>
      <button
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Categories
      </button>

      <div className="mb-8">
        {/* <CategoryFilter
          categories={menuTypes}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        /> */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
        <p className="text-gray-600">{category.description}</p>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.items.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-4">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Heart
                    className={`w-6 h-6 ${wishlist.includes(item.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                      }`}
                  />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-8 text-center text-lg">
                    {selectedQuantities[item.id] || 0}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    const quantity = selectedQuantities[item.id] || 0;
                    if (quantity > 0) {
                      onAddToCart(category.id, item.id, quantity);
                      setSelectedQuantities(prev => ({ ...prev, [item.id]: 0 }));
                    }
                  }}
                  disabled={!selectedQuantities[item.id]}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;