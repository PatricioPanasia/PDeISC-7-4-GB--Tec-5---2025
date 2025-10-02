import { useState, useEffect } from 'react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skills = [
    { name: 'HTML/CSS', level: 90, icon: '💻' },
    { name: 'JavaScript', level: 85, icon: '📜' },
    { name: 'React', level: 80, icon: '⚛️' },
    { name: 'Node.js', level: 75, icon: '🟢' },
    { name: 'Bases de Datos', level: 70, icon: '🗃️' },
    { name: 'UI/UX Design', level: 65, icon: '🎨' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('skills');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Mis Habilidades</h2>
        <div className="row">
          {skills.map((skill, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="skill-item">
                <div className="skill-icon">{skill.icon}</div>
                <h5>{skill.name}</h5>
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transition: 'width 1.5s ease-in-out'
                    }} 
                    aria-valuenow={skill.level} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    {skill.level}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;