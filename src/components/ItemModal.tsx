import React, { useState } from 'react';
import { X, Heart, Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  isInWishlist: boolean;
  onWishlistToggle: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  item,
  onClose,
  onAddToCart,
  isInWishlist,
  onWishlistToggle,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="mt-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-lg font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={onWishlistToggle}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          isInWishlist
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => onAddToCart(item, quantity)}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;