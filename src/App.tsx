// src/App.tsx

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

import Home from './pages/Home';
import TablePage from './pages/TablePage';
import ItemDetail from './pages/ItemDetail';
import ChartsPage from './pages/ChartsPage';
import GalleryItem from './pages/GalleryItem';

const App: React.FC = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Продажи шоколада, база данных
        </Typography>
        <Button color="inherit" component={Link} to="/">Главная</Button>
        <Button color="inherit" component={Link} to="/table">Таблицы</Button>
        <Button color="inherit" component={Link} to="/charts">Графики</Button>
      </Toolbar>
    </AppBar>

    <Container sx={{ mt: 4 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/detail/:id" element={<ItemDetail />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/gallery/:id" element={<GalleryItem />} />
      </Routes>
    </Container>
  </>
);

export default App;
