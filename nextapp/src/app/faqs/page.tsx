"use client";
import { useState, JSX } from "react";

type Faq = {
  question: string;
  answer: JSX.Element;
};

const faqs: Faq[] = [
  {
    question: "¿Qué es el Patronato de Ayuda Cumbres de Santa Fe A.C.?",
    answer: (
      <p>
        Es una iniciativa vecinal que busca apoyar a empleados, personal de
        servicio y habitantes de San Mateo Tlaltenango mediante programas de
        educación, salud y bienestar.
      </p>
    ),
  },
  {
    question: "¿Cómo puedo hacer una donación?",
    answer: (
      <p>
        Puedes donar desde nuestra página{" "}
        <a
          href="/donar"
          className="text-blue-600 underline hover:text-blue-800"
        >
          haciendo clic aquí
        </a>
        , donde encontrarás el enlace a nuestro Moneypool, la plataforma donde
        recibimos donaciones de manera segura.
      </p>
    ),
  },
  {
    question: "¿A quiénes beneficia el Patronato?",
    answer: (
      <p>
        A empleados del condominio, personal doméstico y vecinos del pueblo de
        San Mateo Tlaltenango.
      </p>
    ),
  },
  {
    question: "¿Puedo participar como voluntario?",
    answer: (
      <p>
        ¡Por supuesto! Puedes registrarte en nuestra sección de{" "}
        <a
          href="/voluntariado" 
          className="text-blue-600 underline hover:text-blue-800"
        >
          voluntariado
        </a>{" "}
        para conocer las formas en que puedes ayudar.
      </p>
    ),
  },
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Preguntas Frecuentes
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md p-4 cursor-pointer bg-white shadow-sm"
            onClick={() => toggle(index)}
          >
            <h3 className="text-lg font-semibold text-gray-800 flex justify-between items-center">
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </h3>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
