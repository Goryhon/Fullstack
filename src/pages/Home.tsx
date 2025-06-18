// src/pages/Home.tsx

import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

export default function Home() {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/gallery/${id}`);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto", px: { xs: 1, md: 4 }, mt: 4 }}>
      <Typography variant="h4" mb={2} align="center">
        Ассортимент шоколада
      </Typography>
      <Typography variant="h6" mb={3} align="center">
        Галерея продуктов
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          width: "100%",
        }}
      >
        {products.map((p) => (
          <Card
            key={p.id}
            onClick={() => handleClick(p.id)}
            sx={{
              cursor: "pointer",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: 480,
              boxShadow: 6,
              transition: "transform 0.15s",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <CardMedia
              component="img"
              image={p.img}
              alt={p.name}
              sx={{
                height: 320,
                objectFit: "cover",
                width: "100%",
                borderBottom: "1px solid #eee",
              }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {p.name}
              </Typography>
              <Typography variant="body2">{p.desc}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
