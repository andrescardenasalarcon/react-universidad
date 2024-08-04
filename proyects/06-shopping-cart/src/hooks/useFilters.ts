import { useContext } from "react";
import { FilterContextType } from "../context/FilterType";
import FiltersContext from "../context/filters";
import { Product } from "../models/ProductInterface";

export function useFilters() {
    // const [filters, setFilters] = useState({ category: 'all', minPrice: 0 });
    const { filtersContext, setFiltersContext } = useContext(FiltersContext) as FilterContextType;

    // const mappedProducts: Product[] = products.map((product) => ({
    //   id: product.id,
    //   title: product.title,
    //   thumbnail: product.thumbnail,
    //   category: product.category,
    //   price: product.price,
    // }));

    //FILTROS POR PRECIO Y CATEGORIA
    const filerProducts = (products: Product[]) => {
        return products.filter((product) => {
            return (
                product.price >= filtersContext.minPrice &&
                (filtersContext.category === 'all' ||
                    product.category === filtersContext.category)
            );
        });
    };

    return { filtersContext, setFiltersContext, filerProducts };
}