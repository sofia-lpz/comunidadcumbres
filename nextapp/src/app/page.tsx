"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import Hero from "@/components/home/Hero";
import ProgramCarousel from "@/components/home/ProgramCarousel";
import ProgramModal from "@/components/home/ProgramModal";
import IconPeekCarousel from "@/components/home/IconPeekCarousel";
import BeneficiariesCarousel from "@/components/home/BeneficiariesCarousel";

import { slides } from "@/data/home/slides";
import { iconBlocks } from "@/data/home/iconBlocks";
import { beneficiaries } from "@/data/home/beneficiaries";

export default function Home() {
  const [openProgramIdx, setOpenProgramIdx] = React.useState<number | null>(
    null
  );

  return (
    <div className="min-h-screen">
      {/* ===================== Hero ===================== */}
      <Hero
        title={
          <>
            Patronato de Ayuda
            <br />
            Cumbres de Santa Fe, A.C.
          </>
        }
        ctaButtons={[
          {
            text: "Soy vecino y quiero donar",
            href: "#como-aportar",
            className:
              "bg-[#5D84C4] hover:bg-[#4A6DA6] text-white px-6 py-3 rounded-md font-semibold transition-colors",
          },
          {
            text: "Soy empleado y quiero ser beneficiario",
            href: "/programa-educativo",
            className:
              "bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-semibold transition-colors",
          },
        ]}
      />

      {/* ===================== ¿A quién llega nuestra ayuda? ===================== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <BeneficiariesCarousel items={beneficiaries} />
        </div>
      </section>

      {/* ===================== Carrusel de Programas ===================== */}
      <section className="py-20 bg-gradient-to-r from-[#5D84C4] to-[#5D84C4]">
        <div className="container mx-auto px-4">
          <ProgramCarousel
            slides={slides}
            onOpen={(idx) => setOpenProgramIdx(idx)}
          />
        </div>
      </section>

      {/* ========= Modal de Programa ========= */}
      <ProgramModal
        isOpen={openProgramIdx !== null}
        slide={openProgramIdx !== null ? slides[openProgramIdx] : null}
        onClose={() => setOpenProgramIdx(null)}
      />

      {/* ===================== ¿Cómo aportar? ===================== */}
      <section
        id="como-aportar"
        className="px-6 py-12 max-w-6xl mx-auto space-y-8 scroll-mt-24"
      >
        <h2 className="text-4xl font-bold text-center mb-4">¿Cómo aportar?</h2>
        <p className="text-gray-700 text-center text-lg">
          Tú también puedes formar parte de nuestra misión. Elige la forma que
          más te convenga:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h3 className="text-2xl font-semibold text-[#5D84C4] mb-2">
              Donaciones
            </h3>
            <p className="text-gray-600 flex-grow mb-6">
              Con tu donación ayudas a financiar programas de educación, salud y
              desarrollo comunitario. Cada aporte, grande o pequeño, tiene un
              impacto real.
            </p>
            <Link
              href="/donar"
              className="mt-auto inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-md font-semibold text-center transition"
            >
              Donar ahora
            </Link>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h3 className="text-2xl font-semibold text-[#5D84C4] mb-2">
              Voluntariado
            </h3>
            <p className="text-gray-600 flex-grow mb-6">
              Únete como voluntario y colabora en proyectos presenciales:
              tutorías, jornadas médicas, reforestación y más. ¡Tu tiempo y
              talento son muy valiosos!
            </p>
            <Link
              href="/voluntariado"
              className="mt-auto inline-block bg-[#5D84C4] hover:bg-opacity-90 text-white px-5 py-3 rounded-md font-semibold text-center transition"
            >
              Registrarme
            </Link>
          </section>
        </div>
      </section>

      {/* ===================== Íconos con infinite peek ===================== */}
      <section className="relative py-16">
        {/* Fondo con foto + velo translúcido */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/manitas.jpeg"
            alt="Fondo Patronato"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/60 pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <IconPeekCarousel items={iconBlocks} />
        </div>
      </section>
    </div>
  );
}