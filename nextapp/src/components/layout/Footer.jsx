import React from "react";
import LogoComponent from "../ui/LogoComponent";
import Link from "next/link";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ExternalLink,
  Heart,
  Users,
  BookOpen,
  HandHeart,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Acerca de nosotros", href: "/acerca-de-nosotros" },
    { name: "Nuestro trabajo", href: "/proyectos" },
    { name: "Programas", href: "/programas" },
    { name: "Informe anual", href: "/docs/reporte-anual-2023.pdf" },
    { name: "Contacto", href: "/contacto" },
  ];

  const supportLinks = [
    { name: "Donar", href: "/donar", icon: Heart },
    { name: "Voluntariado", href: "/voluntariado", icon: Users },
    { name: "Eventos", href: "/eventos", icon: BookOpen },
    { name: "Inscribirse", href: "/inscribirse", icon: HandHeart },
  ];

  const resourcesLinks = [
    { name: "Blog", href: "/blog" },
    { name: "Preguntas frecuentes", href: "/faqs" },
    { name: "Términos y condiciones", href: "/terminos" },
  ];

  return (
    <footer className="bg-[#D9D3A7] text-gray-800">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center space-x-3 mb-6 hover:opacity-80 transition"
            >
              <img
                src="/LOGO_COMUNIDAD.png"
                alt="Logo Patronato"
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-black">
                  COMUNIDAD CUMBRES
                </span>
              </div>
            </Link>

            <p className="text-gray-700 text-sm mb-6 leading-relaxed">
              Trabajando juntos para fortalecer nuestra comunidad a través de
              programas de apoyo, educación y desarrollo social.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#5D84C4] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Avenida de los Poetas 100, Cumbres de Santa Fe, Ciudad de
                  México.
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#5D84C4] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  +52 (55) 6912 2028
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#5D84C4] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  info@patronatocumbres.org
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#5D84C4] flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Lun - Vie: 9:00 AM - 5:00 PM
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="w-4 h-4 text-[#5D84C4] flex-shrink-0" />
                <a
                  href="https://www.instagram.com/comunidad_cumbres"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:underline"
                >
                  @comunidad_cumbres
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#5D84C4]">
              Explora
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-700 hover:text-[#5D84C4] transition-colors duration-200 text-sm flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#5D84C4]">Únete</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-700 hover:text-[#5D84C4] transition-colors duration-200 text-sm flex items-center group"
                    >
                      <Icon className="w-4 h-4 mr-2 text-[#5D84C4] group-hover:text-[#5D84C4] transition-colors" />
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#5D84C4]">
              Recursos
            </h3>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-700 hover:text-[#5D84C4] transition-colors duration-200 text-sm flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
      </div>

      {/* Bottom bar */}
      <div className="bg-black bg-opacity-10 border-t border-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
              <span>© {currentYear} Patronato Cumbres de Santa Fe A.C.</span>
              <span className="hidden md:inline">|</span>
              <a
                href="/privacidad"
                className="hover:text-[#5D84C4] transition-colors"
              >
                Política de Privacidad
              </a>
              <span className="hidden md:inline">|</span>
              <a
                href="/terminos"
                className="hover:text-[#5D84C4] transition-colors"
              >
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
