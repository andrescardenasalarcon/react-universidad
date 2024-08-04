import React, { useState } from 'react';
import { EnumTypeOperation } from './enums/EnumTypeOperation';

export function FormularioOperaciones({ typeOperacion = '' }) {
  const [resultado, setResultado] = useState<number>(0);
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);

  function calculate() {
    const operations = EnumTypeOperation(firstNumber, secondNumber);
    
    const data = operations.find((names) => names.name == typeOperacion);
    data?.operation ? setResultado(data?.operation) : setResultado(0);
  }

  const handleSumbit = (e: any) => {
    e?.preventDefault();
    calculate();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.name;
    const dato = Number(event.currentTarget.value);
    if (value === 'num1') {
      setFirstNumber(dato);
    } else {
      setSecondNumber(dato);
    }
  };
  return (
    <>
      <section>
        <h1>Formulario de Operaciónes</h1>

        <div className='card'>
          <form
            action=''
            className='form'
            onSubmit={handleSumbit}
          >
            <label>Numero 1</label>
            <input
              type='number'
              name='num1'
              value={firstNumber}
              onChange={handleChange}
            />
            <label>Numero 2</label>
            <input
              type='number'
              name='num2'
              value={secondNumber}
              onChange={handleChange}
            />
            <button type='submit'>
              {<p>No hay operacion</p> && typeOperacion}
            </button>
            <p>Resultado: {resultado}</p>
          </form>
        </div>
      </section>
    </>
  );
}
