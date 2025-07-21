import React from 'react';
import Link from 'next/link';

export default function Hero({ title, subtitle, ctaButtons }) {
  return (
    <div className="relative bg-[#5D84C4] py-12 md:py-20">
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 w-80 h-80 bg-[#B3A369] opacity-20 rounded-full"></div>
        <div className="absolute -left-20 bottom-10 w-60 h-60 bg-[#5D84C4] opacity-10 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{title}</h1>
          <p className="text-xl mb-10 text-gray-100">{subtitle}</p>

          {/* Contenedor de botones mejorado para móvil */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {ctaButtons.map((button, index) => (
              <Link 
                key={index}
                href={button.href}
                className={`inline-block py-3 px-6 rounded-md font-medium transition-colors text-center min-w-fit ${
                  button.primary 
                    ? 'bg-[#CDA52A] hover:bg-[#B3A369] text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                }`}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}