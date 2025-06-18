// src/pages/ChartsPage.tsx

import React, { useEffect, useState } from "react";
import { Box, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line,
  CartesianGrid,
} from "recharts";

type GroupByOption = "country" | "product" | "sales_person";

interface StatData {
  group: string;     // country/product/manager name
  max_amount: number;
  min_amount: number;
  avg_amount: number;
}

const COLORS = ["#1976d2", "#ef5350", "#66bb6a"]; // Синий, красный, зеленый

export default function ChartsPage() {
  const [groupBy, setGroupBy] = useState<GroupByOption>("country");
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [data, setData] = useState<StatData[]>([]);

  useEffect(() => {
    let url = `/api/v1/stats/sales?group=${groupBy}`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData([]));
  }, [groupBy]);

  const handleGroupChange = (e: any) => setGroupBy(e.target.value as GroupByOption);
  const handleChartTypeChange = (e: any) => setChartType(e.target.value);

  return (
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2}>Статистика продаж</Typography>
      <Box display="flex" gap={3} mb={3}>
        <FormControl>
          <InputLabel>Группировать по</InputLabel>
          <Select value={groupBy} label="Группировать по" onChange={handleGroupChange}>
            <MenuItem value="country">Страна</MenuItem>
            <MenuItem value="product">Продукт</MenuItem>
            <MenuItem value="sales_person">Менеджер</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Тип графика</InputLabel>
          <Select value={chartType} label="Тип графика" onChange={handleChartTypeChange}>
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="line">Line</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="max_amount" name="Максимум" fill={COLORS[0]} />
            <Bar dataKey="min_amount" name="Минимум" fill={COLORS[1]} />
            <Bar dataKey="avg_amount" name="Среднее" fill={COLORS[2]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="max_amount" name="Максимум" stroke={COLORS[0]} />
            <Line type="monotone" dataKey="min_amount" name="Минимум" stroke={COLORS[1]} />
            <Line type="monotone" dataKey="avg_amount" name="Среднее" stroke={COLORS[2]} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Box>
  );
}
