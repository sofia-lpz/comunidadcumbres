"use client";
import React, { useState, useEffect, JSX } from "react";
import { MapPin, Menu, X, Phone } from "lucide-react";
import LogoComponent from "../ui/LogoComponent";
import Link from "next/link";

interface MenuItem {
  name: string;
  href: string;
}

interface TopMenuItem extends MenuItem {
  icon: React.ElementType;
}

export default function NavBar(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainMenuItems: MenuItem[] = [
    { name: "Inicio", href: "/" },
    { name: "Acerca de nosotros", href: "/acerca-de-nosotros" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contacto" },
  ];

  const topMenuItems: TopMenuItem[] = [
    { icon: MapPin, href: "/ubicacion", name: "Ubicación" },
    { icon: Phone, href: "/contacto", name: "Contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[#5D84C4] shadow-lg transition-all duration-300 ${
        isScrolled ? "h-20" : "h-28"
      }`}
    >
      {/* Top Bar - Se oculta en scroll */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm h-12">
            <div className="text-gray-100">
              Transformando vidas en nuestra comunidad
            </div>
            <div className="flex items-center space-x-6">
              {topMenuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-100 hover:text-[#D9D3A7] transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div
          className={`flex justify-between items-center ${
            isScrolled ? "h-20" : "h-16"
          }`}
        >
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <div
                className={`transition-all duration-300 ${
                  isScrolled ? "scale-90" : "scale-100"
                }`}
              >
                <LogoComponent variant="white" size={48} showText={true} />
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div
            className={`hidden lg:flex items-center space-x-8 transition-all duration-300 ${
              isScrolled ? "opacity-100" : "opacity-90"
            }`}
          >
            {mainMenuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <span className="font-medium text-white hover:text-[#D9D3A7] transition-colors whitespace-nowrap">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Donate Button */}
            <a
              href="/donar"
              className="bg-[#D9D3A7] hover:bg-[#CDA52A] text-gray-800 px-6 py-2 rounded-md font-semibold transition-colors"
            >
              DONAR
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden bg-[#5D84C4] ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 border-t border-white border-opacity-20">
          <div className="flex flex-col space-y-4">
            {mainMenuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-medium py-2 text-white hover:text-[#D9D3A7] transition-colors">
                  {item.name}
                </span>
              </Link>
            ))}
            <hr className="my-2 border-white border-opacity-20" />
            <div className="flex flex-col space-y-2">
              {topMenuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-2 py-2 text-gray-200 hover:text-[#D9D3A7] transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
