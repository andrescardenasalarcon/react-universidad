import { useContext } from "react";
import { Product } from "../models/ProductInterface";
import FiltrosContext, { FiltrosContexto } from "../context/filters";

export function useFiltros() {

    const {filtros, setFiltros} = useContext(FiltrosContext) as FiltrosContexto;
      
    const filtroProductos = (products: Product[]) => {
      return products.filter((product) => {
        return (
          product.price >= filtros.minPrice &&
          (filtros.category === 'all' || product.category == filtros.category)
        );
      });
    };
  
    return { filtros, filtroProductos, setFiltros };
  }