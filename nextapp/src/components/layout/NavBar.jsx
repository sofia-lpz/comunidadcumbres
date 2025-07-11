'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, Menu, X, Phone } from 'lucide-react';

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 50);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const mainMenuItems = [
        { name: 'Acerca de nosotros', href: '/acerca-de-nosotros' },
        { name: 'Nuestro trabajo', href: '/proyectos' },
        { name: 'Contacto', href: '/contacto' }
    ];

    const topMenuItems = [
        { icon: MapPin, href: '/ubicacion', name: 'Ubicación' },
        { icon: Phone, href: '/contacto', name: 'Contacto' }
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#D9D3A7] shadow-lg transition-all duration-300 ${
            isScrolled ? 'py-2' : 'py-4'  
        }`}>
            {/* Top Bar - Se oculta en scroll */}
            <div className={`transition-all duration-300 overflow-hidden ${
                isScrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-2 text-sm">
                        <div className="text-gray-800">
                            Transformando vidas en nuestra comunidad
                        </div>
                        <div className="flex items-center space-x-6">
                            {topMenuItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="flex items-center space-x-1 text-gray-800 hover:text-blue-600 transition-colors"
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
                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">P</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-gray-800">PATRONATO</span>
                                    <span className="text-sm text-gray-800">Cumbres</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className={`hidden lg:flex items-center space-x-8 transition-all duration-300 ${
                        isScrolled ? 'opacity-0 max-w-0 overflow-hidden' : 'opacity-100 max-w-none'
                    }`}>
                        {mainMenuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="font-medium text-gray-800 hover:text-blue-600 transition-colors whitespace-nowrap"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-md hover:bg-yellow-500 hover:bg-opacity-20 transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? 
                                <X className="w-6 h-6 text-gray-800" /> : 
                                <Menu className="w-6 h-6 text-gray-800" />
                            }
                        </button>

                        {/* Donate Button */}
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md font-semibold transition-colors">
                            DONAR
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
                isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="container mx-auto px-4 py-4 border-t border-yellow-600">
                    <div className="flex flex-col space-y-4">
                        {mainMenuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="font-medium py-2 text-gray-800 hover:text-blue-600 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <hr className="my-2 border-yellow-600" />
                        <div className="flex flex-col space-y-2">
                            {topMenuItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="flex items-center space-x-2 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}