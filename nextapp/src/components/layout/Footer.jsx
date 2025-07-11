import React from 'react';
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
        { name: "Contacto", href: "/contacto" },
    ];

    const supportLinks = [
        { name: "Donar", href: "/donar", icon: Heart },
        { name: "Voluntariado", href: "/voluntariado", icon: Users },
        { name: "Eventos", href: "/eventos", icon: BookOpen },
        { name: "Inscribirse", href: "/inscribirse", icon: HandHeart }
    ];

    const resourcesLinks = [
        { name: "Blog", href: "/blog" },
        { name: "Publicaciones", href: "/publicaciones" },
        { name: "Preguntas frecuentes", href: "/faqs" },
        { name: "Términos y condiciones", href: "/terminos" }
    ];

    const socialLinks = [
        { name: "Facebook", href: "#", icon: Facebook },
        { name: "Instagram", href: "#", icon: Instagram },
        { name: "Twitter", href: "#", icon: Twitter },
        { name: "YouTube", href: "#", icon: Youtube },
    ];

    return (
        <footer className="bg-[#5D84C4] text-white">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Contact Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#CDA52A] to-[#B3A369] rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">P</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-black">PATRONATO</span>
                                <span className="text-sm text-black">Cumbres de Santa Fe</span>
                            </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                            Trabajando juntos para fortalecer nuestra comunidad a través de programas de apoyo, 
                            educación y desarrollo social.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-[#CDA52A] flex-shrink-0" />
                                <span className="text-sm text-gray-300">
                                    Cumbres de Santa Fe, Ciudad de México
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-[#CDA52A] flex-shrink-0" />
                                <span className="text-sm text-gray-300">+52 (55) 1234-5678</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-[#CDA52A] flex-shrink-0" />
                                <span className="text-sm text-gray-300">info@patronatocumbres.org</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="w-4 h-4 text-[#CDA52A] flex-shrink-0" />
                                <span className="text-sm text-gray-300">
                                    Lun - Vie: 9:00 AM - 5:00 PM
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#D9D3A7]">
                            Explora
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#CDA52A] transition-colors duration-200 text-sm flex items-center group"
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
                        <h3 className="text-lg font-semibold mb-4 text-[#D9D3A7]">
                            Únete
                        </h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <li key={link.name}>
                                        <a 
                                            href={link.href}
                                            className="text-gray-300 hover:text-[#CDA52A] transition-colors duration-200 text-sm flex items-center group"
                                        >
                                            <Icon className="w-4 h-4 mr-2 text-[#B3A369] group-hover:text-[#CDA52A] transition-colors" />
                                            {link.name}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#D9D3A7]">
                            Recursos
                        </h3>
                        <ul className="space-y-2">
                            {resourcesLinks.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#CDA52A] transition-colors duration-200 text-sm flex items-center group"
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
            <div className="bg-black bg-opacity-30 border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
                            <span>© {currentYear} Patronato Cumbres de Santa Fe A.C.</span>
                            <span className="hidden md:inline">|</span>
                            <a href="/privacidad" className="hover:text-[#CDA52A] transition-colors">
                                Política de Privacidad
                            </a>
                            <span className="hidden md:inline">|</span>
                            <a href="/terminos" className="hover:text-[#CDA52A] transition-colors">
                                Términos de Uso
                            </a>
                        </div>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a 
                                        key={social.name}
                                        href={social.href}
                                        className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#CDA52A] transition-colors duration-200"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-4 h-4 text-white" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}