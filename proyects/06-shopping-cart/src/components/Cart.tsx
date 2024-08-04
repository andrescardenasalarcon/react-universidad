import './Cart.css';
import { useId } from 'react';
import { ClearCartIcon, CartIcon } from './Icons';
import { useCart } from '../hooks/useCart';

function CartItem({ thumbnail, price, title, quantity, addCart }: any) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addCart } = useCart();

  return (
    <>
      <label
        className='cart-button'
        htmlFor={cartCheckboxId}
      >
        <CartIcon />
      </label>

      <input
        type='checkbox'
        id={cartCheckboxId}
        hidden
      />

      <aside className='cart'>
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addCart={() => addCart(product)}
              {...product}
            />
          ))}
        </ul>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
