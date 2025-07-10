'use client';
import React, {useState, useEffect} from 'react';
import {MapPin, Menu, X, Phone } from 'lucide-react';

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 50);
        };

        // Verificar el scroll inicial
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        
    }, []);

    const mainMenuItems = [
        {name: 'Acerca de nosotros', href: '/acerca-de-nosotros'},
        {name: 'Nuestro trabajo', href: '/proyectos'},
        {name: 'Contacto', href: '/contacto'}
    ];

    const topMenuItems = [
        { icon: MapPin, href: '/ubicacion', name: 'Ubicación' },
        { icon: Phone, href: '/contacto', name: 'Contacto' }
    ];

    return (
    <nav className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'  
    }`}
    style={{backgroundColor: '#D9D3A7'}}
    >
      {/* Top Bar - Se oculta en scroll */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isScrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm">
            <div style={{color: '#222222'}}>
              Transformando vidas en nuestra comunidad
            </div>
            <div className="flex items-center space-x-6">
              {topMenuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-1 transition-colors hover:text-[#5D84C4]"
                  style={{color: '#222222'}}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`transition-all duration-300 ${
              isScrolled ? 'scale-75' : 'scale-100'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-r from-[#CDA52A] to-[#B3A369] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold" style={{color: '#222222'}}>PATRONATO</span>
                  <span className="text-sm" style={{color: '#222222'}}>Cumbres</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Menu - Se oculta en scroll */}
          <div className={`hidden lg:flex items-center space-x-8 transition-all duration-300 ${
            isScrolled ? 'opacity-0 max-w-0 overflow-hidden' : 'opacity-100 max-w-none'
          }`}>
            {mainMenuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="font-medium transition-colors whitespace-nowrap hover:text-[#5D84C4]"
                style={{color: '#222222'}}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side - Boton de donar siempre visible */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-[#B3A369] hover:bg-opacity-20"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" style={{color: '#222222'}} /> : <Menu className="w-6 h-6" style={{color: '#222222'}} />}
            </button>

            {/* Donate Button*/}
            <button className="bg-[#CDA52A] hover:bg-[#B3A369] text-white px-6 py-2 rounded-md font-semibold transition-colors">
              DONAR
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isClient && (
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="container mx-auto px-4 py-4 border-t border-[#B3A369]">
            <div className="flex flex-col space-y-4">
              {mainMenuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="font-medium py-2 transition-colors hover:text-[#5D84C4]"
                  style={{color: '#222222'}}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <hr className="my-2 border-[#B3A369]" />
              <div className="flex flex-col space-y-2">
                {topMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-2 transition-colors py-2 hover:text-[#5D84C4]"
                    style={{color: '#A4A966'}}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
    );
}