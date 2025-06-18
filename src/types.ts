// src/types.ts

// Продавец шоколада
export interface SalesPerson {
  id: number;
  name: string;
}

// Страна продажи
export interface Country {
  id: number;
  name: string;
}

// Продукт (шоколад)
export interface Product {
  id: number;
  name: string;
}

// Продажа шоколада
export interface Sale {
  id: number;
  sale_date: string;
  amount: number;
  boxes_shipped: number;
  sales_person: { id: number; name: string };
  country: { id: number; name: string };
  product: { id: number; name: string };
  _links?: {
    self: { href: string };
    update: { href: string; method: string };
    delete: { href: string; method: string };
  };
}
