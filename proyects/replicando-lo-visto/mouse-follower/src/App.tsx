import { useEffect, useState } from 'react';

function App() {
  const [activado, setActivado] = useState(false);
  const [posicion, setPosicion] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('effect', { activado });

    const handleMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      console.log('handleMove', { clientX, clientY });
      setPosicion({ x: clientX, y: clientY });
    };

    if (activado) {
      addEventListener('pointermove', handleMove);
    }

    return () => {
      console.log('limpiado!!!');
      removeEventListener('pointermove', handleMove);
    };
  }, [activado]);

  return (
    <main>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${posicion.x}px, ${posicion.y}px)`,
        }}
      ></div>
      <button
        onClick={() => {
          setActivado(!activado);
        }}
      >
        {activado ? 'Desactivar' : 'Activar'} Seguir Puntero
      </button>
    </main>
  );
}

export default App;
