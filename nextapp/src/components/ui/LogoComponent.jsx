import React from 'react';
import Image from 'next/image';

const LogoComponent = ({ 
  variant = 'yellow', 
  size = 48, 
  className = '',
  showText = true 
}) => {
  const logoSrc = variant === 'yellow' 
    ? '/LOGO_COMUNIDAD.png' 
    : '/LOGO.png';
  
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Image 
        src={logoSrc} 
        alt="Comunidad Cumbres Logo" 
        width={size} 
        height={size}
        className="w-12 h-12"
        priority
      />
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-800">COMUNIDAD</span>
          <span className="text-sm text-gray-800">CUMBRES</span>
        </div>
      )}
    </div>
  );
};

export default LogoComponent;
