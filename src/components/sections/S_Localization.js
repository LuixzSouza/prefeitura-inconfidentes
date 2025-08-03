"use client";
import { ContainerGrid } from "../layout/ContainerGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Heading_2 } from "../font/Heading_2";
import Image from "next/image";

const InfoIcon = ({ children }) => (
  <div className="flex-shrink-0 bg-green-100 text-green-800 rounded-full p-2">
    {children}
  </div>
);

const images = [
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/1.jpg",
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/2.jpg",
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/3.jpg",
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/4.jpg",
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/5.jpg",
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/site_4.jpg",
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/site_5.jpg",
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/site_6.jpg",
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/site_7.jpg",
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/site_8.jpg",
  "https://inconfidentes.mg.gov.br/wp-content/uploads/2022/04/Design_sem_nome_33.png",
];

const facts = [
  { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>, label: "Altitude", value: "869 m" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>, label: "Gentílico", value: "Inconfidentense" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-3-1m-3 1l-3 1m-3-1l3-1.091m0 0l4.5 1.636m10.5-1.182l-3-1.091M12 5.25v2.25m0 0l-3 1m3-1l3 1" /></svg>, label: "Área total", value: "145,40 km²" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" /></svg>, label: "Fundação", value: "30/12/1962" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.087-5.038.75.75 0 00-.62-1.095 3.75 3.75 0 00-7.233 2.33A4.5 4.5 0 002.25 15z" /></svg>, label: "Clima", value: "Tropical de altitude" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.67c.12-.241.252-.477.388-.702m-8.655 4.67c.594.594 1.453.945 2.387.945a3.747 3.747 0 002.748-1.228" /></svg>, label: "População", value: "7.358 (IBGE 2020)" },
];

export function S_Localization() {
  return (
    <section className="bg-gradient-to-b from-green-50 via-green-50 to-green-50 py-20 md:py-28">
      <ContainerGrid>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-24">
          <div className="lg:col-span-3">
            <Heading_2 title={"Conheça Inconfidentes"} className="text-green-800" />
            <p className="mt-4 text-gray-700 leading-relaxed">
              Localizada no Sul de Minas Gerais, Inconfidentes é um refúgio a 869 metros de altitude, 
              marcado por um agradável clima tropical, paisagens de serras e a riqueza do Rio Mogi Guaçu. 
              Com uma população acolhedora de 7.358 habitantes, a cidade preserva as tradições mineiras e a forte ligação com o campo.
              <br /><br />
              A apenas 188 km de São Paulo, o município é um destino cheio de potencial, ideal para quem busca tranquilidade,
              contato com a natureza e a hospitalidade de seu povo.
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul className="grid grid-cols-2 gap-4">
              {facts.map((fact, index) => (
                <li key={index} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
                  <InfoIcon>{fact.icon}</InfoIcon>
                  <div>
                    <span className="font-semibold text-green-700">{fact.label}</span>
                    <p className="text-gray-600 text-sm">{fact.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Galeria com Swiper --- */}
        <div className="relative mb-24">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }}
            pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
            }}
            className="!p-1"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <Image
                    width={400} height={250}
                    src={src}
                    alt={`Galeria de Imagens de Inconfidentes ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Controles */}
          <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-0 z-10 cursor-pointer bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md transition-opacity hover:bg-white disabled:opacity-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-0 z-10 cursor-pointer bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md transition-opacity hover:bg-white disabled:opacity-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </div>
          <div className="swiper-pagination-custom !relative !bottom-auto mt-8 flex justify-center gap-2"></div>
          <style jsx global>{`
            .swiper-pagination-custom .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background-color: #d1d5db;
              opacity: 1;
              transition: background-color 0.3s, width 0.3s;
            }
            .swiper-pagination-custom .swiper-pagination-bullet-active {
              width: 25px;
              border-radius: 5px;
              background-color: #047857;
            }
          `}</style>
        </div>

        {/* --- Mapa --- */}
        <div className="bg-gray-50 p-4 sm:pt-8 sm:pb-0 sm:px-8 rounded-2xl shadow-sm">
          <Heading_2 title={"Onde Estamos"} className="text-green-800" />
          <div className="relative mt-6 grid grid-cols-1 md:flex h-auto">
            <div className="relative md:col-span-1 h-full hidden md:flex items-end justify-center">
              <Image
                src="/images/peregrino.png"
                alt="Estátua do Peregrino - Caminho da Fé"
                width={320}
                height={800}
                className="relative bottom-0 h-full w-auto object-contain drop-shadow-2xl"
              />
            </div>
            <div className="md:col-span-2 w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3704.832262174301!2d-46.39213568559904!3d-22.31327198522369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c96a84462d2571%3A0x6b7e8f5c4a5c689!2sInconfidentes%2C%20MG%2C%2037576-000!5e0!3m2!1spt-BR!2sbr!4v1690000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </ContainerGrid>
    </section>
  );
}
