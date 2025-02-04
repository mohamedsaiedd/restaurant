import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, useLocation, Navigate, useNavigate } from 'react-router-dom';
import CategoryGrid from './components/CategoryGrid';
import CategoryItems from './components/CategoryItems';
import Cart from './components/Cart';
import CategoryFilter from './components/CategoryFilter';
import { MenuCategory, OrderItem } from './types';
import { ShoppingCart, Heart, User } from 'lucide-react';
import Wish from './components/Wish';

const menuTypes = [
  'Breakfast Menu',
  'Lunch Menu',
  'Dinner Menu',
  'Special Menu',
  'Kids Menu',
  'Dessert Menu',
];

export const menuData: MenuCategory[] = [
  {
    id: 1,
    name: 'Appetizers',
    description: 'Start your meal with our delicious appetizers',
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&q=80&w=1000',
    type: 'Dinner Menu',
    items: [
      {
        id: 101,
        name: 'Bruschetta',
        description: 'Grilled bread rubbed with garlic and topped with tomatoes, olive oil, and basil',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 102,
        name: 'Calamari Fritti',
        description: 'Crispy fried squid served with marinara sauce',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 103,
        name: 'Caprese Salad',
        description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 104,
        name: 'Spinach Artichoke Dip',
        description: 'Creamy spinach and artichoke dip served with tortilla chips',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 105,
        name: 'Garlic Shrimp',
        description: 'Sautéed shrimp in garlic butter sauce',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1000',
      },
    ],
  },
  {
    id: 2,
    name: 'Main Courses',
    description: 'Signature dishes crafted with passion',
    type: 'Dinner Menu',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000',
    items: [
      {
        id: 201,
        name: 'Filet Mignon',
        description: '8oz premium cut beef tenderloin with red wine reduction',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 202,
        name: 'Chicken Marsala',
        description: 'Pan-seared chicken breast with mushroom marsala sauce',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 203,
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with lemon herb butter',
        price: 28.99,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 204,
        name: 'Vegetable Risotto',
        description: 'Creamy Arborio rice with seasonal vegetables',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 205,
        name: 'Rack of Lamb',
        description: 'Herb-crusted lamb rack with mint sauce',
        price: 36.99,
        image: 'https://images.unsplash.com/photo-1602847213180-50e43a80bfdf?auto=format&fit=crop&q=80&w=1000',
      },
    ],
  },
  {
    id: 3,
    name: 'Seafood',
    description: 'Fresh catches from the ocean',
    type: 'Dinner Menu',
    image: 'https://images.unsplash.com/photo-1599486850626-471d4b04c3ff?auto=format&fit=crop&q=80&w=1000',
    items: [
      {
        id: 301,
        name: 'Lobster Thermidor',
        description: 'Lobster meat in rich brandy cream sauce',
        price: 42.99,
        image: 'https://images.unsplash.com/photo-1553247407-23251ce81f59?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 302,
        name: 'Seared Scallops',
        description: 'Pan-seared sea scallops with citrus butter',
        price: 32.99,
        image: 'https://images.unsplash.com/photo-1599458252573-56ae36120de1?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 303,
        name: 'Seafood Paella',
        description: 'Spanish rice with mixed seafood and saffron',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=1000',
      },
    ],
  },
  {
    id: 4,
    name: 'Pasta & Risotto',
    description: 'Italian classics made with authentic ingredients',
    type: 'Dinner Menu',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1000',
    items: [],
  },
  {
    id: 5,
    name: 'Grill & BBQ',
    description: 'Perfectly grilled meats and vegetables',
    type: 'Dinner Menu',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=1000',
    items: [],
  },
  {
    id: 6,
    name: 'Salads',
    description: 'Fresh and healthy options',
    type: 'Lunch Menu',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
    items: [],
  },
  {
    id: 7,
    name: 'Pizza',
    description: 'Wood-fired pizzas with premium toppings',
    type: 'Lunch Menu',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000',
    items: [],
  },
  {
    id: 8,
    name: 'Desserts',
    description: 'Sweet endings to your perfect meal',
    type: 'Dessert Menu',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=1000',
    items: [],
  },
  {
    id: 9,
    name: 'Beverages',
    description: 'Refreshing drinks and cocktails',
    type: 'Special Menu',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=1000',
    items: [],
  },
  {
    id: 10,
    name: 'Vegan & Vegetarian',
    description: 'Plant-based delicacies',
    type: 'Special Menu',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
    items: [],
  },
];

function AppContent() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [wish, setWish] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const location = useLocation();
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    navigate('/', { state: { selectedFilter: category } });
  };

  useEffect(() => {
    const state = location.state as { selectedFilter?: string };
    if (state?.selectedFilter) {
      setSelectedCategory(state.selectedFilter);
    }
  }, [location]);

  const filteredCategories = selectedCategory === 'all'
    ? menuData
    : menuData.filter(category => category.type === selectedCategory);

  const addToCart = (categoryId: number, itemId: number, quantity: number) => {
    const category = menuData.find(c => c.id === categoryId);
    const item = category?.items.find(i => i.id === itemId);
    
    if (item) {
      setCart(prev => {
        const existingItem = prev.find(i => i.item.id === itemId);
        if (existingItem) {
          return prev.map(i =>
            i.item.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { item, quantity }];
      });

    }
    if (item) {
      setWish(prev => {
        const existingItem = prev.find(i => i.item.id === itemId);
        if (existingItem) {
          return prev.map(i =>
            i.item.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { item, quantity }];
      });
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">LOGO</h1>
            <div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              // onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <Heart className="w-6 h-6" />
              {wish.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wish.length}
                </span>
              )}
            </button>
            {/* <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <User className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button> */}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <CategoryFilter
          categories={menuTypes}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        <Routes>
          <Route path="/" element={<CategoryGrid categories={filteredCategories} />} />
          <Route 
            path="/category/:id" 
            element={<CategoryItems categories={menuData} onAddToCart={addToCart} />} 
          />
        </Routes>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        setCart={setCart}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;