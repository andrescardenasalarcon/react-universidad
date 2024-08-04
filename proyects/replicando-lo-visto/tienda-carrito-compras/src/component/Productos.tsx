import '../styles/Productos.css';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons';
import { Product } from '../models/ProductInterface';
import { useCarro } from '../hooks/useCarro';
import { ICarroContextType } from '../context/cart';

export function Productos({ products }: { products: Product[] }) {
  const { addAlCarro, removeDelCarro, carro } = useCarro();

  const checkProductoInCart = (product: Product) => {
    return carro.some((item) => item.id === product.id);
  };
  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map((product) => {
          const isProductoEnCarro = checkProductoInCart(product);

          return (
            <li key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <button
                style={{backgroundColor: isProductoEnCarro ? 'red': 'green'}}
                  onClick={() =>
                    isProductoEnCarro
                      ? removeDelCarro(product)
                      : addAlCarro(product)
                  }
                >
                  {isProductoEnCarro ? (
                    <RemoveFromCartIcon />
                  ) : (
                    <AddToCartIcon />
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
