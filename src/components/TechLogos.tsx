import React, { useState, useEffect } from 'react';

export default function TechLogos(): JSX.Element {
  // Los 4 sufijos de color oficiales que coinciden con tus archivos
  const colors: string[] = ['green', 'yellow', 'red', 'blue'];
  const [selectedColor, setSelectedColor] = useState<string>('yellow');

  useEffect(() => {
    // Cambia el color de los logos de forma aleatoria
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSelectedColor(randomColor);
  }, []);

  // Tus 5 tecnologías actuales
  const techs: string[] = ['github', 'linux', 'opengnsys', 'powershell', 'windows'];

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