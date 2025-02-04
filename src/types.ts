export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
  items: MenuItem[];
}

export interface OrderItem {
  item: MenuItem;
  quantity: number;
}