// src/pages/GalleryItem.tsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";

const products = [
  {
    id: 1,
    name: "50% Dark Bites",
    img: "/images/choco1.jpg",
    desc: "Мягкая горчинка, сливочный вкус, нежная текстура. Шоколад для повседневного наслаждения.",
  },
  {
    id: 2,
    name: "70% Dark Bites",
    img: "/images/choco2.jpg",
    desc: "Более насыщенный и тёмный вкус, идеален для любителей шоколада с характером.",
  },
  {
    id: 3,
    name: "85% Dark Bars",
    img: "/images/choco3.jpg",
    desc: "Очень тёмный шоколад, минимум сахара, максимум какао. Для настоящих ценителей.",
  },
  {
    id: 4,
    name: "99% Dark & Pure",
    img: "/images/choco4.jpg",
    desc: "Чистый шоколад без компромиссов. Только какао и ничего лишнего.",
  },
];

export default function GalleryItem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <Box>
        <Typography color="error">Продукт не найден</Typography>
        <Button onClick={() => navigate(-1)} variant="contained" sx={{ mt: 2 }}>
          Назад к галерее
        </Button>
      </Box>
    );
  }

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Card>
        <CardMedia
          component="img"
          height="250"
          image={product.img}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1">{product.desc}</Typography>
        </CardContent>
      </Card>
      <Button onClick={() => navigate(-1)} variant="contained" sx={{ mt: 2 }}>
        Назад к галерее
      </Button>
    </Box>
  );
}
