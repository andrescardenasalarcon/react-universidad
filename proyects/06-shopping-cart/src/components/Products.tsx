import './Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons';
import { Product } from '../models/ProductInterface';
import { useCart } from '../hooks/useCart';

export function Products({ products }: { products: Product[] }) {
  const { addCart, cart, removeFromCart } = useCart();

  const checkedProductInCart = (product: Product) => {
    return cart.some((item) => item.id === product.id);
  };
  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map((product) => {
          const isProductInCart = checkedProductInCart(product);

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
                  style={{ backgroundColor: isProductInCart ? 'red' : 'green' }}
                  onClick={() =>
                    isProductInCart ? removeFromCart(product) : addCart(product)
                  }
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
            
          );
        })}
      </ul>
    </main>
  );
}
