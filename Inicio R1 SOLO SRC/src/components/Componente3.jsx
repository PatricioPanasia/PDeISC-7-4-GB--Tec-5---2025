import { useState } from 'react';
import './Componente3.css';

function Componente3() {
  const [contador, setContador] = useState(0); // Estado inicial en 0

  return (
    <div className="contador-container">
      <h2>Contador: {contador}</h2>
      <div className="botones">
        <button onClick={() => setContador(contador + 1)}>Incrementar</button>
        <button onClick={() => setContador(contador - 1)}>Decrementar</button>
      </div>
    </div>
  );
}

export default Componente3;
