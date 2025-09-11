import { useState, useEffect } from 'react';

const Achievements = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const targetValues = [15, 250, 500, 10];
  const duration = 2000; // ms

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('achievements');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          startCounting();
        }
      }
    };

    const startCounting = () => {
      const increment = targetValues.map(value => value / (duration / 20));
      
      const interval = setInterval(() => {
        setCounters(prev => {
          const newCounters = prev.map((counter, index) => {
            if (counter < targetValues[index]) {
              return Math.min(counter + increment[index], targetValues[index]);
            }
            return counter;
          });
          
          if (newCounters.every((counter, index) => counter >= targetValues[index])) {
            clearInterval(interval);
          }
          
          return newCounters;
        });
      }, 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <h2 className="section-title">Mis Logros</h2>
        <div className="row">
          <div className="col-md-3 col-6 mb-4">
            <div className="achievement-item">
              <div className="counter">{Math.round(counters[0])}+</div>
              <p>Proyectos Completados</p>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-4">
            <div className="achievement-item">
              <div className="counter">{Math.round(counters[1])}+</div>
              <p>Clientes Satisfechos</p>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-4">
            <div className="achievement-item">
              <div className="counter">{Math.round(counters[2])}+</div>
              <p>Horas de Desarrollo</p>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-4">
            <div className="achievement-item">
              <div className="counter">{Math.round(counters[3])}+</div>
              <p>Premios Obtenidos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;