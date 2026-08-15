export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
};

export type StockStatus = "OUT_OF_STOCK" | "LOW_STOCK" | "NORMAL";

export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return "OUT_OF_STOCK";
  if (stock < 5) return "LOW_STOCK";
  return "NORMAL";
}
