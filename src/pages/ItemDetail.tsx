// src/pages/ItemDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSaleById } from "../api";
import { Sale } from "../types";
import { Typography, Card, CardContent, Box, Button } from "@mui/material";

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sale, setSale] = useState<Sale | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchSaleById(id)
      .then((data) => setSale(data))
      .catch(() => setSale(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (!sale) {
    return (
      <Box>
        <Typography color="error">Продажа не найдена</Typography>
        <Button onClick={() => navigate(-1)} variant="contained" sx={{ mt: 2 }}>
          Назад
        </Button>
      </Box>
    );
  }

  // Вспомогательные функции — показываем имя или пустую строку, если нет
  const getName = (field: any) =>
    typeof field === "string" ? field : field?.name || "";

  return (
    <Box maxWidth={450} mx="auto" mt={5}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Детали продажи шоколада
          </Typography>
          <Typography>
            <b>Дата продажи:</b> {sale.sale_date}
          </Typography>
          <Typography>
            <b>Сумма продажи:</b> {sale.amount}
          </Typography>
          <Typography>
            <b>Количество коробок:</b> {sale.boxes_shipped}
          </Typography>
          <Typography>
            <b>Менеджер:</b> {getName(sale.sales_person)}
          </Typography>
          <Typography>
            <b>Страна:</b> {getName(sale.country)}
          </Typography>
          <Typography>
            <b>Продукт:</b> {getName(sale.product)}
          </Typography>
        </CardContent>
      </Card>
      <Button onClick={() => navigate(-1)} variant="contained" sx={{ mt: 2 }}>
        Назад к таблице
      </Button>
    </Box>
  );
};

export default ItemDetail;
