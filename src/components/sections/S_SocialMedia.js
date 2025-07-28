"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heading_2 } from "../font/Heading_2";
import { ContainerGrid } from "../layout/ContainerGrid";

const socialTabs = ["Instagram", "Facebook", "YouTube"];

const allPosts = [
  {
    src: "https://inconfidentes.mg.gov.br/wp-content/uploads/sb-instagram-feed-images/523038978_18037604483669538_1263792696046966888_nlow.webp",
    alt: "Post Instagram 1",
    title: "Campeonato Municipal",
    description: "Confira as últimas partidas do campeonato local.",
    social: "Instagram"
  },
  {
    src: "https://inconfidentes.mg.gov.br/wp-content/uploads/sb-instagram-feed-images/523375241_18037589714669538_3270669814871326561_nlow.webp",
    alt: "Post Instagram 2",
    title: "Reunião com Prefeitos",
    description: "Alinhamento de ações regionais no CISAMESP.",
    social: "Instagram"
  },
  {
    src: "https://inconfidentes.mg.gov.br/wp-content/uploads/sb-instagram-feed-images/524117296_18037617461669538_2147451411748035214_nfull.webp",
    alt: "Post Instagram 3",
    title: "Esporte em Ação",
    description: "Projeto de futebol para jovens no campo municipal.",
    social: "Instagram"
  },
  {
    src: "https://inconfidentes.mg.gov.br/wp-content/uploads/sb-instagram-feed-images/524714400_18037573640669538_4464204137921432061_nlow.webp",
    alt: "Post Instagram 4",
    title: "Bate-Papo Esportivo",
    description: "Conversa com atletas locais sobre incentivo ao esporte.",
    social: "Instagram"
  },
  {
    src: "/images/facebook_post1.jpg",
    alt: "Post Facebook 1",
    title: "Evento Cultural",
    description: "Apresentação de dança no centro da cidade.",
    social: "Facebook"
  },
  {
    src: "/images/youtube_video1.jpg",
    alt: "Vídeo YouTube",
    title: "Transmissão ao Vivo",
    description: "Sessão da Câmara transmitida ao vivo.",
    social: "YouTube"
  }
];

export function S_SocialMedia() {
  const [activeTab, setActiveTab] = useState("Instagram");

  const filteredPosts = allPosts.filter(post => post.social === activeTab);

  return (
    <section className="py-16 bg-white">
      <ContainerGrid>
        <Heading_2 title="Redes Sociais"/>
        
        <div className="flex gap-4 my-6">
          {socialTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 border ${
                activeTab === tab
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          loop
          className="py-4"
        >
          {filteredPosts.map((post, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[280px] rounded-xl overflow-hidden shadow-md group">
                <Image
                  src={post.src}
                  alt={post.alt}
                  width={280}
                  height={280}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 flex flex-col justify-end text-white cursor-pointer">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm">{post.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </ContainerGrid>
    </section>
  );
}
