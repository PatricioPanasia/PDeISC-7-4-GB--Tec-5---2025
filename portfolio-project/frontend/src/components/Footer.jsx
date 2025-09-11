import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
const Footer = () => {
  
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h4>Contacto</h4>
            <p><i className="bi bi-envelope me-2"></i> varimport@gmail.com</p>
            <p><i className="bi bi-phone me-2"></i> +54 (223) 3331484</p>
            <p><i className="bi bi-geo-alt me-2"></i> Mar del Plata, Buenos Aires, Argentina.</p>
          </div>
          <div className="col-lg-4 mb-4">
            <h4>Enlaces Rápidos</h4>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-white text-decoration-none">Inicio</a></li>
              <li><a href="#skills" className="text-white text-decoration-none">Habilidades</a></li>
              <li><a href="#experience" className="text-white text-decoration-none">Experiencia</a></li>
              <li><a href="#projects" className="text-white text-decoration-none">Proyectos</a></li>
            </ul>
          </div>
          <div className="col-lg-4 mb-4">
            <h4>Sígueme</h4>
            <div className="social-links">
              <a href="https://github.com/PatricioPanasia" target="_blank" rel="noopener noreferrer"><FaGithub size={30} /></a>
              <a href="https://www.linkedin.com/in/patricio-panasia-b1311347" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} /></a>
              <a href="https://x.com/patoleonel_" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} /></a>
              <a href="https://www.instagram.com/patoleonel_" target="_blank" rel="noopener noreferrer"> <FaInstagram size={30} /></a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Patricio Panasia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;