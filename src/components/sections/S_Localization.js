"use client";
import { ContainerGrid } from "../layout/ContainerGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Heading_2 } from "../font/Heading_2";
import Image from "next/image";

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

export function S_Localization() {
  return (
    <section className="bg-white py-16">
      <ContainerGrid>
        <div className="flex justify-between items-center mb-6">
          <Heading_2 title={"Conheça Inconfidentes"} />
          <button className="text-sm text-green-800 font-medium hover:underline">
            Conhecer +
          </button>
        </div>

        <div className="bg-green-100 p-6 rounded-lg mb-8 flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <p className="text-sm text-gray-800 leading-relaxed">
              Inconfidentes está localizada no Sul de Minas Gerais, a 869 metros de altitude,
              com clima tropical de altitude e uma população estimada em 7.358 habitantes.
              Reconhecida por suas belas paisagens, serras e cursos d’água como o Rio Mogi Guaçu,
              o município é marcado por relevo acidentado, solo fértil e grande diversidade biológica.
              <br /><br />
              Seus moradores e cultura estão fortemente ligados ao campo, às tradições mineiras e à hospitalidade do povo.
              Inconfidentes faz limite com Bueno Brandão, Ouro Fino, Borda da Mata e Bom Repouso, e está a apenas 188 km da capital paulista,
              sendo um destino acolhedor, produtivo e cheio de potencial.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-white">
            <div className="bg-green-600 p-3 rounded">Altitude: 869 m</div>
            <div className="bg-green-600 p-3 rounded">Gentílico: Inconfidentense</div>
            <div className="bg-green-600 p-3 rounded">Área total: 145,40 km²</div>
            <div className="bg-green-600 p-3 rounded">Fundação: 30/12/1962</div>
            <div className="bg-green-600 p-3 rounded">Clima: Tropical</div>
            <div className="bg-green-600 p-3 rounded">População: 7.358 (IBGE 2020)</div>
          </div>
        </div>

        {/* Swiper Carousel */}
        <div className="mb-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-10"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  width={400} height={250}
                  src={src}
                  alt={`Imagem ${index + 1}`}
                  className="rounded-lg w-full h-60 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mapa + Estátua */}
        <div className="relative">
          <Heading_2 title={"Mapa"}/>
          <div className="relative rounded-lg overflow-hidden pt-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14764.022994127761!2d-46.3225986!3d-22.315622349999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c97ae3a99e1751%3A0x131d3c3e0e9da656!2sInconfidentes%2C%20MG%2C%2037576-000!5e0!3m2!1spt-BR!2sbr!4v1753643726144!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-lg pl-40"
            ></iframe>

            <Image
              src="/images/peregrino.png"
              alt="Estátua"
              width={220}
              height={800}
              className="absolute bottom-0 left-0 -mb-2"
            />
          </div>
        </div>
      </ContainerGrid>
    </section>
  );
}
