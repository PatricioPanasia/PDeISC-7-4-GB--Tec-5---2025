const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Asistente de servicios hoteleros",
      company: "Hotel Bastit",
      period: "2021 - Presente",
      description: "Recepción, coordinación,desayunos, incidencias, proveedores, cobranzas, inventarios, análisis, servicios, huéspedes."
    },
    {
      id: 2,
      title: "Bartender y encargado de barra",
      company: "Mr.Jones",
      period: "2024 - 2025",
      description: "Tragos clásicos, stock, proactividad, compañerismo, conexión, eficiencia, control, desempeño, trabajo, barra."
    },
    {
      id: 3,
      title: "Practicante de Desarrollo",
      company: "E.E.S.T N 5",
      period: "2025",
      description: "Desarrollo de un sistema de gestión para la secretaria de la institución, utiizando: Node, React, Bootstrap, etc."
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">Experiencia Laboral</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>{exp.title}</h4>
                <h5 className="text-primary">{exp.company}</h5>
                <p className="text-muted">{exp.period}</p>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;