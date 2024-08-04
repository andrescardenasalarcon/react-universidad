import { Filters } from './Filters';
import { CartIcon } from './Icons';

export function Header() {
  return (
    <header>
      <h1>
        Shop shopping
        <CartIcon />
      </h1>
      <Filters />
    </header>
  );
}
