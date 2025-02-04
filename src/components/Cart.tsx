import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { OrderItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  setCart: React.Dispatch<React.SetStateAction<OrderItem[]>>;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, setCart }) => {
  const updateQuantity = (itemId: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.item.id === itemId
          ? {
              ...item,
              quantity: Math.max(0, item.quantity + delta),
            }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-6 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;