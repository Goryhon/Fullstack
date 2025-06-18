import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef} from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";
import { fetchSales } from "../api";

export default function TablePage() {
  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    fetchSales()
      .then((data) => {
        const flatRows = data.map((sale: any) => ({
          id: sale.id,
          sale_date: sale.sale_date ? sale.sale_date.slice(0, 10) : "",
          amount: sale.amount,
          boxes_shipped: sale.boxes_shipped,
          sales_person: sale.sales_person?.name || "",
          country: sale.country?.name || "",
          product: sale.product?.name || "",
        }));
        setRows(flatRows);
      })
      .catch((err) => alert("Ошибка загрузки данных: " + err.message));
  }, []);

  const columns: GridColDef[] = [
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
        pageSizeOptions={[10, 20, 50]}
        showToolbar={true}
        disableRowSelectionOnClick
        sx={{ backgroundColor: "#fff", height: "630px" }}
      />
    </Container>
  );
}
