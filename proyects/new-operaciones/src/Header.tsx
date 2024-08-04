import { FormularioOperaciones } from './FormularioOperaciones';
import { useTypeOperation } from './hooks/useTypeOperation';

export function Header() {
  const { typeOperation, handleTypeOperation } = useTypeOperation();

  return (
    <>
      <nav>
        <button onClick={() => handleTypeOperation('suma')}>Suma</button>
        <button onClick={() => handleTypeOperation('resta')}>Resta</button>
        <button onClick={() => handleTypeOperation('multiplicacion')}>
          Multiplicación
        </button>
        <button onClick={() => handleTypeOperation('division')}>
          División
        </button>
      </nav>
      <section>
        <FormularioOperaciones typeOperacion={typeOperation} />
      </section>
    </>
  );
}
