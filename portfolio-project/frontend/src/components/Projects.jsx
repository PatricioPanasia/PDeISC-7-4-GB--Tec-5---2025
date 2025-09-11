import { useState } from 'react';
import varNoticiasImg from '../assets/varnoticias.png';
import pptImage from '../assets/ppt.png';
import formularioImage from '../assets/formulario.png';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: "Var Noticias",
      description: "Blog realizado para una reconocida multinacional de los medios de comunicación.",
      image: varNoticiasImg, // 👈 usamos la importación
      technologies: ["React", "Node.js", "Bootstrap"],
      link: "https://www.google.com"
    },
    {
      id: 2,
      title: "Página web con 3 juegos",
      description: "En esta página podías jugar online de manera local 3 juegos diferentes.",
      image: pptImage,
      technologies: ["Node.js", "Express", "Socket.io"],
      link: "https://www.google.com"
    },
    {
      id: 3,
      title: "Base de datos con formulario y visualización de usuarios",
      description: "En este caso desarrollé un formulario donde el usuario podia cargar sus usuarios, y en otro apartado, podía verlos.",
      image: formularioImage,
      technologies: ["React", "Node.js", "API Integration"],
      link: "https://www.google.com"
    },
    
  ];

  const handleMouseEnter = (id) => {
    setActiveProject(id);
  };

  const handleMouseLeave = () => {
    setActiveProject(null);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Proyectos Realizados</h2>
        <div className="row">
          {projects.map(project => (
            <div key={project.id} className="col-md-6 col-lg-4 mb-4">
              <div 
                className="project-card card h-100"
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={handleMouseLeave}
              >
                <img src={project.image} className="project-img card-img-top" alt={project.title} />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  <div className="mb-3">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="badge bg-primary me-1">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <a href={project.link} className="btn btn-outline-primary">Ver Detalles</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;