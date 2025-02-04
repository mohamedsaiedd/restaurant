import React from 'react';
import { Heart } from 'lucide-react';
import { MenuCategory, MenuItem } from '../types';

interface CategoryCardProps {
  category: MenuCategory;
  onItemClick: (item: MenuItem) => void;
  isInWishlist: (item: MenuItem) => boolean;
  onWishlistToggle: (item: MenuItem) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onItemClick,
  isInWishlist,
  onWishlistToggle,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white">{category.name}</h2>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {category.items.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => onItemClick(item)}
              >
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onWishlistToggle(item);
                }}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInWishlist(item)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;