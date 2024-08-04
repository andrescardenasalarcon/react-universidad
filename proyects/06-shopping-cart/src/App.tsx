import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CartIcon } from './components/Icons';
import { Products } from './components/Products';
import { CartProvider } from './context/cart';
import { useFilters } from './hooks/useFilters';
import productsMock from './mocks/products.json';
//EN CASO DE NECITAR UN CONTEXT DE TIPO ARRAY --> https://www.youtube.com/watch?v=0-vcdYaozL0

function App() {
  const { filerProducts } = useFilters();

  const filtredProducts = filerProducts(productsMock.products);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filtredProducts} />
      <Footer />
    </CartProvider>
  );
}

export default App;
