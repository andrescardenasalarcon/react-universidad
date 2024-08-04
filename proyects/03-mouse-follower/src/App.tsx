/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 }); //para guardar la posicion

  useEffect(() => {
    console.log("effect", { enabled });

    const handleMove = (event: any) => {
      const { clientX, clientY } = event;
      console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      addEventListener("pointermove", handleMove);
    }

    // cleanup
    //limpiar los efectos para desactualizar un componente en este ej el addEventListener
    return () => {
      console.log("cleanup");
      removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);
  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0,0,0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <button
        onClick={() => {
          setEnabled(!enabled);
        }}
      >
        {enabled ? "Desactivar" : "Activar"} Seguir puntero
      </button>
    </>
  );
};

function App() {
  const [mounted, setMounted] = useState(true);

  return (
    <main>
      {/* Si este montado renderizamos el FollowMouse */}
      {/* {mounted && <FollowMouse />}  */}
      {/* <button
        onClick={() => {
          setMounted(!mounted);
        }}
      >
        Toggle mounted FollowMouse component
      </button> */}
      <FollowMouse />
    </main>
  );
}

export default App;
