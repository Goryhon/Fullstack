# Fullstack-приложение: Продажи шоколада (Flask + React + MUI + Recharts)

## Описание

Этот проект — пример связки современного frontend на React + TypeScript + MUI + Recharts и backend на Flask (SQLAlchemy ORM, RESTful API).  
Всё разворачивается локально, фронт и бэк работают как единое fullstack-приложение для учета и анализа продаж шоколада.

---

## Структура проекта


    /choco_project

    │

    ├── app.py 

    ├── config.py 

    ├── models.py 

    ├── resources/
    
    │   ├── sale.py 

    │   └── stats.py   

    ├── upload_db.py  

    ├── choco_sales.db 

    │

    └── frontend/

        ├── package.json
    
        └── src/
    
            ├── api.ts
        
            ├── types.ts
        
            ├── pages/
        
            │   ├── Home.tsx
        
            │   ├── TablePage.tsx
        
            │   ├── ItemDetail.tsx
        
            │   ├── ChartsPage.tsx
        
            │   └── GalleryItem.tsx
        
            ├── App.tsx
        
            └── index.tsx
        


---

## Backend: Flask

### 1. Подготовь базу данных и ORM-модели

**models.py:**

    class Sale(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        sale_date = db.Column(db.String)
        amount = db.Column(db.Float)
        boxes_shipped = db.Column(db.Integer)
        sales_person_id = db.Column(db.Integer, db.ForeignKey('sales_person.id'))
        country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
        product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    
        sales_person = db.relationship('SalesPerson')
        country = db.relationship('Country')
        product = db.relationship('Product')
        
### 2. Реализуй RESTful ресурсы для CRUD и статистики

**resources/sale.py:**

    def sale_to_dict(sale):
        return {
            "id": sale.id,
            "sale_date": sale.sale_date,
            "amount": sale.amount,
            "boxes_shipped": sale.boxes_shipped,
            "sales_person": {
                "id": sale.sales_person.id,
                "name": sale.sales_person.name
            } if sale.sales_person else None,
            "country": {
                "id": sale.country.id,
                "name": sale.country.name
            } if sale.country else None,
            "product": {
                "id": sale.product.id,
                "name": sale.product.name
            } if sale.product else None,
        }
**resources/stats.py:**
**(Универсальный эндпоинт для графиков)** 

    class SaleStatsResource(Resource):
        def get(self):
            group = request.args.get("group", "country")
            # Аналогично примеру выше...
            # Формирует список вида [{"group": "Россия", "max_amount": 11000, ...}]
**app.py:**

    from resources.sale import SaleListResource, SaleResource
    from resources.stats import SaleStatsResource
    
    api.add_resource(SaleListResource, '/api/v1/sales')
    api.add_resource(SaleResource, '/api/v1/sales/<int:sale_id>')
    api.add_resource(SaleStatsResource, '/api/v1/stats/sales')

## 3. Запусти Flask backend
    python app.py
Сервер доступен на http://localhost:5000

## Frontend: React + MUI + Recharts
## 1. Установи зависимости
    cd frontend
    npm install
Проверь, что в package.json есть:

    "proxy": "http://localhost:5000"
Это нужно, чтобы все fetch-запросы из фронта уходили на Flask без проблем.
## 2. Подключи API на фронте
**src/api.ts:**

    const API_BASE = "/api/v1";
    
    // Получение продаж
    export async function fetchSales() {
      const res = await fetch(`${API_BASE}/sales`);
      return res.json();
    }
    
    // Получение статистики для графика
    export async function fetchSaleStats(group: string) {
      const res = await fetch(`${API_BASE}/stats/sales?group=${group}`);
      return res.json();
    }
**src/types.ts:**

    export interface Sale {
      id: number;
      sale_date: string;
      amount: number;
      boxes_shipped: number;
      sales_person: { id: number; name: string };
      country: { id: number; name: string };
      product: { id: number; name: string };
    }
## 3. Таблица продаж
Внеси в нее все необъодимые изменения для корректной работы
**src/pages/TablePage.tsx**

    import React, { useEffect, useState } from "react";
    import { DataGrid, GridToolbar } from "@mui/x-data-grid";
    import { fetchSales } from "../api";
    import { Container, Typography } from "@mui/material";
    
    export default function TablePage() {
      const [rows, setRows] = useState([]);
    
      useEffect(() => {
        fetchSales().then(data => {
          const flatRows = data.map(sale => ({
            id: sale.id,
            sale_date: sale.sale_date?.slice(0, 10) || "",
            sales_person: sale.sales_person?.name || "",
            country: sale.country?.name || "",
            product: sale.product?.name || "",
            amount: sale.amount,
            boxes_shipped: sale.boxes_shipped,
          }));
          setRows(flatRows);
        });
      }, []);
    
      const columns = [
        { field: "sale_date", headerName: "Дата продажи", width: 130 },
        { field: "sales_person", headerName: "Менеджер", width: 170 },
        { field: "country", headerName: "Страна", width: 130 },
        { field: "product", headerName: "Продукт", width: 170 },
        { field: "amount", headerName: "Сумма", width: 120 },
        { field: "boxes_shipped", headerName: "Коробок", width: 110 },
      ];
    
      return (
        <Container maxWidth="lg" sx={{ height: "700px", mt: "20px" }}>
          <Typography variant="h4" mb={2}>Продажи шоколада</Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            sx={{ backgroundColor: "#fff", height: "630px" }}
          />
        </Container>
      );
    }
## 4. Графики
**src/pages/ChartsPage.tsx**

    import React, { useEffect, useState } from "react";
    import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
    import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
    
    export default function ChartsPage() {
      const [groupBy, setGroupBy] = useState("country");
      const [data, setData] = useState([]);
    
      useEffect(() => {
        fetch(`/api/v1/stats/sales?group=${groupBy}`)
          .then(r => r.json())
          .then(setData);
      }, [groupBy]);
    
      return (
        <Box>
          <Typography variant="h4" mb={2}>Статистика продаж</Typography>
          <FormControl>
            <InputLabel>Группировать по</InputLabel>
            <Select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
              <MenuItem value="country">Страна</MenuItem>
              <MenuItem value="product">Продукт</MenuItem>
              <MenuItem value="sales_person">Менеджер</MenuItem>
            </Select>
          </FormControl>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis dataKey="group" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="max_amount" fill="#1976d2" />
              <Bar dataKey="min_amount" fill="#ef5350" />
              <Bar dataKey="avg_amount" fill="#66bb6a" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      );
    }
## 5. Запусти фронтенд
    cd frontend
    npm start
Он запустится на http://localhost:3000/

Бэкенд (Flask) стартует на http://localhost:5000

Фронтенд (React) — на http://localhost:3000

Все fetch-запросы с фронта перенаправляются на бэк благодаря "proxy": "http://localhost:5000"

## 6. Результат
Все данные с Flask API автоматически подтягиваются на фронт (таблица, графики, детали).

Настроена строгая типизация и удобный UI.

## Резюме
Backend: Flask + SQLAlchemy → JSON API

Frontend: React + TypeScript + MUI + Recharts → SPA

Связь: Прокси (proxy в package.json), стандартные REST-эндпоинты /api/v1/..., строгое соответствие типов.



