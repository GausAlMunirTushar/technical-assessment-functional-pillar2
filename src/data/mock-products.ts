import { Product } from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "MacBook Pro M2",
    category: "Laptops",
    price: 2499,
    stock: 8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Logitech MX Master 3",
    category: "Accessories",
    price: 99,
    stock: 0,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Dell XPS 15",
    category: "Laptops",
    price: 1899,
    stock: 3,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60",
  },
];
