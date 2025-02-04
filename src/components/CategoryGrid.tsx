import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuCategory } from '../types';

interface CategoryGridProps {
  categories: MenuCategory[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map(category => (
        <div
          key={category.id}
          onClick={() => navigate(`/category/${category.id}`)}
          className="group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105"
        >
          <div className="relative h-64">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
              <p className="text-gray-200 text-sm">{category.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;