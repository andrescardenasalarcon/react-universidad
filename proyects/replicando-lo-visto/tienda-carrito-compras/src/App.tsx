import './App.css';
import { products } from './mocks/products.json';
import { Productos } from './component/Productos';
import { useContext, useState } from 'react';
import { Product } from './models/ProductInterface';
import { Header } from './component/Header';
import { FiltrosContext } from './context/filters';
import { useFiltros } from './hooks/useFiltros';
import { Carrito } from './component/Carrito';
import { CarroProvider } from './context/cart';

function App() {
  const { filtros, filtroProductos } = useFiltros();
  const filtradosProductos = filtroProductos(products);

  return (
    <CarroProvider>
      <Header />
      <Carrito />
      <Productos products={filtradosProductos} />
    </CarroProvider>
  );
}

export default App;
