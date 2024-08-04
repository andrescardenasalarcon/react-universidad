import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  function contadoLetras(word: string): { [key: string]: number } {
    const letrasContador: { [key: string]: number } = {};
    for (const letras of word) {
      console.log("letras =", letras);
      console.log("letrasContador[letras] = ", letrasContador[letras]);

      if (letrasContador[letras]) {
        letrasContador[letras]++;
      } else {
        letrasContador[letras] = 1;
      }
    }
    return letrasContador;
  }

  function puedeFormarPalabra(
    palabraBase: string,
    objetivoPalabra: string
  ): boolean {
    const baseContador = contadoLetras(palabraBase);
    const objetivoContador = contadoLetras(objetivoPalabra);

    console.log("baseContador = ", baseContador);
    console.log("objetivoContador = ", objetivoContador);
    for (const letra in objetivoContador) {
      console.log("!baseContador[letra] = ", !baseContador[letra]);
      console.log(
        "objetivoContador[letra] > baseContador[letra] = ",
        objetivoContador[letra] > baseContador[letra]
      );

      if (
        !baseContador[letra] ||
        objetivoContador[letra] > baseContador[letra]
      ) {
        return false; //No se puede formar la palabra objetivo
      }
    }
    return true;
  }

  function menuFactura(gifts: string[], materials: string): string[] {
    return gifts.filter((gift) => puedeFormarPalabra(materials, gift));
  }

  const gifts = ["tren", "oso", "pelota"];
  const materials = "tronesao";
  const arrMaterial: string[] = menuFactura(gifts, materials);
  console.log(arrMaterial);

  return (
    <>
      <h1>Contador y fomrador de palabras</h1>
      {arrMaterial.map((material) => (
        <li>{material}</li>
      ))}
    </>
  );
}

export default App;
