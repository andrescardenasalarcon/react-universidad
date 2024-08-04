import '../styles/Carrito.css';
import { useId } from 'react';
import {
  CartIcon,
  ClearCartIcon,
  RemoveFromCartIcon,
} from '../component/Icons';
import { useCarro } from '../hooks/useCarro';

function CartItem({ thumbnail, price, title, quantity, addAlCarro }: any) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />

      <div>
        <strong>{title}</strong> - ${price}{' '}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addAlCarro}>+</button>
      </footer>
    </li>
  );
}

export function Carrito() {
  const cartCheckBoxId = useId();
  const { carro, clearCarro, addAlCarro } = useCarro();

  return (
    <>
      <label
        htmlFor={cartCheckBoxId}
        className='cart-button'
      >
        <CartIcon />
      </label>
      <input
        type='checkbox'
        id={cartCheckBoxId}
        hidden
      />
      <aside className='cart'>
        <ul>
          {carro.map((product) => (
            <CartItem
              key={product.id}
              addAlCarro={() => addAlCarro(product)}
              {...product}  
            />
          ))}
        </ul>

        <button onClick={clearCarro}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
