import { useState } from "react";
import Componente1 from './components/Componente1';
import Componente2 from './components/Componente2';
import Componente3 from './components/Componente3';
import Componente4 from './components/Componente4';
import Componente5 from './components/Componente5';

function App() {
  const [componenteActivo, setComponenteActivo] = useState(null);

  const renderizarComponente = () => {
    switch (componenteActivo) {
      case 1: return <Componente1 />;
      case 2: return <Componente2 />;
      case 3: return <Componente3 />;
      case 4: return <Componente4 />;
      case 5: return <Componente5 />;
      default: return <p style={{ textAlign: "center", marginTop: "20px" }}>Selecciona un componente para visualizarlo</p>;
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Selecciona un componente</h1>
      <div style={{ marginBottom: "20px" }}>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setComponenteActivo(num)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Ver Componente {num}
          </button>
        ))}
      </div>
      {renderizarComponente()}
    </div>
  );
}

export default App;
