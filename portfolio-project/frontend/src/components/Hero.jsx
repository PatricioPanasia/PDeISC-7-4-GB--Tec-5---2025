const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="fade-in">Hola, soy Patricio Panasia</h1>
            <p className="fade-in delay-1">Desarrollador Full Stack apasionado por crear soluciones innovadoras</p>
            <div className="fade-in delay-2">
              <a href="#projects" className="btn btn-light btn-lg me-3">Ver Proyectos</a>
              <a href="#contact" className="btn btn-outline-light btn-lg">Contactarme</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;