// src/api.ts

import { Sale } from "./types";

// Базовый путь к API — обязательно настрой proxy или впиши реальный адрес
const API_BASE = "/api/v1";
// Получить список всех продаж шоколада
export async function fetchSales(): Promise<Sale[]> {
  const res = await fetch(`${API_BASE}/sales`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Не удалось загрузить продажи");
  return res.json();
}

// Получить одну продажу по id
export async function fetchSaleById(id: number | string): Promise<Sale> {
  const res = await fetch(`${API_BASE}/sales/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Не удалось загрузить продажу");
  return res.json();
}

// Добавить новую продажу
export async function createSale(sale: Omit<Sale, "id" | "_links">): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE}/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(sale),
  });
  if (!res.ok) throw new Error("Ошибка добавления продажи");
  return res.json();
}

// Обновить продажу
export async function updateSale(id: number, sale: Partial<Sale>): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/sales/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(sale),
  });
  if (!res.ok) throw new Error("Ошибка обновления продажи");
  return res.json();
}

// Удалить продажу
export async function deleteSale(id: number): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/sales/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Ошибка удаления продажи");
  return res.json();
}

// Получить статистику (min/max/avg) по странам
export async function fetchSaleStatsByCountry(): Promise<
  { country: string; max_amount: number; min_amount: number; avg_amount: number }[]
> {
  const res = await fetch(`${API_BASE}/stats/sales`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Ошибка загрузки статистики");
  return res.json();
}
