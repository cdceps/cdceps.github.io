import React, { useState, useEffect } from 'react';

export default function TechLogos() {
  // Los 4 sufijos de color oficiales que coinciden con tus archivos
  const colors = ['green', 'yellow', 'red', 'blue'];
  const [selectedColor, setSelectedColor] = useState('yellow'); // Por defecto en amarillo

  useEffect(() => {
    // Tira el dado en el cliente y elige el color de la sesión
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSelectedColor(randomColor);
  }, []);

  // Tus 5 tecnologías actuales (fácilmente ampliable a 10 metiendo más strings al array)
  const techs = ['github', 'linux', 'opengnsys', 'powershell', 'windows'];

  return (
    <div className="home-logos-grid">
      {techs.map((tech) => (
        <img
          key={tech}
          src={`/img/${tech}-icon-${selectedColor}.svg`}
          alt={tech}
          className="tech-home-icon"
          title={tech.toUpperCase()}
        />
      ))}
    </div>
  );
}