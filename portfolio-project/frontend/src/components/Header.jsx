import { useState } from 'react';

const Header = ({ scrollPosition }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top navbar-custom ${scrollPosition > 100 ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <a className="navbar-brand" href="#home">Mi Portfolio</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleNavCollapse}
          aria-expanded={!isNavCollapsed}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home" onClick={handleNavCollapse}>Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#skills" onClick={handleNavCollapse}>Habilidades</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#achievements" onClick={handleNavCollapse}>Logros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#experience" onClick={handleNavCollapse}>Experiencia</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects" onClick={handleNavCollapse}>Proyectos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={handleNavCollapse}>Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;