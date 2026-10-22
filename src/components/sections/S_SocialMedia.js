"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heading_2 } from "../font/Heading_2";
import { ContainerGrid } from "../layout/ContainerGrid";

// --- DADOS ---
// Objeto com as informações de cada perfil para tornar a seção dinâmica
const socialProfiles = {
  Instagram: {
    username: 'prefeiturainconfidentes',
    description: '🧶 Capital Nacional do Crochê • Terra dos Caminhos 📲 Informações, serviços e notícias oficiais.',
    profilePic: '/images/favicon.png',
    url: 'https://www.instagram.com/prefeiturainconfidentes/',
    themeColor: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500', // Gradiente do Instagram
    icon: '/icons/instagram.svg' 
  },
  Facebook: {
    username: 'Prefeitura de Inconfidentes',
    description: 'Página oficial da Prefeitura. Fique por dentro de todas as ações e novidades da nossa cidade.',
    profilePic: '/images/favicon.png', // Caminho para uma imagem de perfil do Facebook
    url: 'https://www.facebook.com/prefeituramunicipalde.inconfidentes',
    themeColor: 'bg-blue-600', // Azul do Facebook
    icon: '/icons/facebook.svg'
  },
  YouTube: {
    username: 'Prefeitura de Inconfidentes',
    description: 'Canal oficial para transmissões ao vivo, vídeos institucionais e reportagens sobre Inconfidentes.',
    profilePic: '/images/favicon.png', // Caminho para uma imagem de perfil do YouTube
    url: 'https://www.youtube.com/watch?v=TBy_ZZ7zs4Q',
    themeColor: 'bg-red-600', // Vermelho do YouTube
    icon: '/icons/youtube.svg'
  }
};

// Array de posts, agora com um campo 'href' para o link
const allPosts = [
  {
    src: "/images/noticias/inconfidentes-supera-media-nacional-em-qualidade-de-vida.jpg",
    alt: "Qualidade de vida",
    title: "Qualidade de vida",
    description: "Inconfidentes supera a média nacional no IPS Brasil 2026.",
    social: "Instagram",
    href: "https://www.instagram.com/prefeiturainconfidentes/"
  },
  {
    src: "/images/noticias/prefeitura-de-inconfidentes-realiza-entrega-inedita-de-mater.jpg",
    alt: "Material escolar",
    title: "Material escolar",
    description: "Entrega inédita de material escolar personalizado.",
    social: "Instagram",
    href: "https://www.instagram.com/prefeiturainconfidentes/"
  },
  {
    src: "/images/site/site_4.jpg",
    alt: "Turismo",
    title: "Turismo",
    description: "Conheça os caminhos e paisagens de Inconfidentes.",
    social: "Instagram",
    href: "https://www.instagram.com/prefeiturainconfidentes/"
  },
  {
    src: "/images/noticias/pelo-segundo-ano-consecutivo-inconfidentes-e-ouro-no-selo-na.jpg",
    alt: "Selo Ouro na Alfabetização",
    title: "Selo Ouro na Alfabetização",
    description: "Pelo segundo ano consecutivo, Inconfidentes é OURO.",
    social: "Facebook",
    href: "https://www.facebook.com/prefeituramunicipalde.inconfidentes"
  },
  {
    src: "/images/noticias/credenciamento-para-a-feira-de-moda-circular-esta-com-inscri.jpg",
    alt: "Feira de Moda Circular",
    title: "Feira de Moda Circular",
    description: "Credenciamento aberto para artesãos e brechós.",
    social: "Facebook",
    href: "https://www.facebook.com/prefeituramunicipalde.inconfidentes"
  },
  {
    src: "/images/noticias/prefeitura-abre-cadastramento-de-entidades-para-participacao.jpg",
    alt: "Arraiá Beneficente",
    title: "Arraiá Beneficente",
    description: "Cadastramento de entidades para o Arraiá 2026.",
    social: "Facebook",
    href: "https://www.facebook.com/prefeituramunicipalde.inconfidentes"
  },
  {
    src: "https://i.ytimg.com/vi/TBy_ZZ7zs4Q/hqdefault.jpg",
    alt: "Vídeo institucional",
    title: "Vídeo institucional",
    description: "Conheça Inconfidentes em imagens.",
    social: "YouTube",
    href: "https://www.youtube.com/watch?v=TBy_ZZ7zs4Q"
  }
];


// --- COMPONENTE PRINCIPAL ---
export function S_SocialMedia() {
  const [activeTab, setActiveTab] = useState("Instagram");

  const filteredPosts = allPosts.filter(post => post.social === activeTab);
  const activeProfile = socialProfiles[activeTab];

  return (
    <section className="py-20 md:py-28 bg-white">
      <ContainerGrid>
        <Heading_2 title="Nossas Redes Sociais" />

        {/* ABAS DINÂMICAS */}
        <div className="flex items-center gap-2 sm:gap-4 my-8 border-b border-gray-200">
          {Object.keys(socialProfiles).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 font-semibold transition-all duration-300 border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-gray-800 text-gray-800'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CABEÇALHO DE PERFIL DINÂMICO */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 my-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <Image 
            src={activeProfile.profilePic} 
            alt={`Foto de perfil de ${activeProfile.username}`} 
            width={96} 
            height={96} 
            className="rounded-full flex-shrink-0 shadow-md"
          />
          <div className="flex-grow text-center sm:text-left">
            <h3 className="text-2xl font-bold text-gray-800">{activeProfile.username}</h3>
            <p className="text-gray-600 mt-1">{activeProfile.description}</p>
          </div>
          <a 
            href={activeProfile.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105 ${activeProfile.themeColor}`}
          >
            Seguir
          </a>
        </div>

        {/* CARROSSEL COM NAVEGAÇÃO PERSONALIZADA */}
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: `.swiper-button-next-${activeTab}`, // Navegação única por aba para evitar conflitos
                    prevEl: `.swiper-button-prev-${activeTab}`,
                }}
                spaceBetween={24}
                slidesPerView={1.2}
                breakpoints={{
                    640: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 3.5 },
                    1280: { slidesPerView: 4 },
                }}
                loop={filteredPosts.length > 4}
                key={activeTab} // Força a remontagem do Swiper ao trocar de aba, resetando a posição
            >
                {filteredPosts.map((post, index) => (
                    <SwiperSlide key={`${activeTab}-${index}`}>
                        {/* CARD DO POST - note o ícone e o gradiente */}
                        <a href={post.href} target="_blank" rel="noopener noreferrer" className="block relative h-[320px] rounded-xl overflow-hidden shadow-lg group text-white">
                            <Image
                                src={post.src}
                                alt={post.alt}
                                fill
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <Image 
                                src={activeProfile.icon}
                                alt={`${post.social} icon`}
                                width={24}
                                height={24}
                                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm p-1 rounded-full"
                            />
                            <div className="absolute bottom-0 left-0 p-4">
                                <h3 className="font-bold text-lg leading-tight">{post.title}</h3>
                                <p className="text-sm opacity-90 mt-1">{post.description}</p>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* CONTROLES DE NAVEGAÇÃO PERSONALIZADOS */}
            <div className={`swiper-button-prev-${activeTab} absolute top-1/2 -translate-y-1/2 -left-4 z-10 cursor-pointer bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md transition-opacity hover:bg-white disabled:opacity-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </div>
            <div className={`swiper-button-next-${activeTab} absolute top-1/2 -translate-y-1/2 -right-4 z-10 cursor-pointer bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md transition-opacity hover:bg-white disabled:opacity-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </div>
        </div>
      </ContainerGrid>
    </section>
  );
}