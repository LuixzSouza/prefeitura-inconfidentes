'use client';

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Heading_2 } from "../font/Heading_2";
import { ContainerGrid } from "../layout/ContainerGrid";
import Image from "next/image";

// --- Helpers ---
const LAT = -22.3133;
const LON = -46.3897;

const weatherCodeMap = {
  0: "Céu limpo", 1: "Predominantemente limpo", 2: "Parcialmente nublado", 3: "Nublado",
  45: "Nevoeiro", 48: "Nevoeiro com geada",
  51: "Garoa leve", 53: "Garoa moderada", 55: "Garoa densa",
  61: "Chuva fraca", 63: "Chuva moderada", 65: "Chuva forte",
  80: "Pancadas de chuva fracas", 81: "Pancadas de chuva moderadas", 82: "Pancadas de chuva violentas",
  95: "Trovoada", 96: "Trovoada com granizo", 99: "Trovoada com granizo forte"
};

// Mapeamento de códigos de clima para ícones (emojis como exemplo)
const weatherIconMap = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  80: "🌦️", 81: "🌦️", 82: "⛈️",
  95: "⛈️", 96: "🌨️", 99: "🌨️"
};

// Função para formatar a data
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// --- Componente Principal ---
export function S_Temperature() {
  const [data, setData] = useState(null);
  const [view, setView] = useState("today"); // 'today' ou 'weekly'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Adicionamos 'hourly' para ter a previsão hora a hora do dia de hoje
    const params = new URLSearchParams({
      latitude: LAT,
      longitude: LON,
      current_weather: true,
      daily: 'temperature_2m_max,temperature_2m_min,weathercode',
      hourly: 'temperature_2m,weathercode', // Pedindo dados horários
      timezone: 'America/Sao_Paulo',
    });

    fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error(`Erro na resposta da API: ${res.status}`);
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar Open-Meteo:", err);
        setError("Não foi possível obter os dados do clima.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando dados do clima...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const { current_weather: cw, daily, hourly } = data;
  const today = daily.time[0];

  const bgColor = (temp) => {
    if (temp >= 35) return "rgba(255, 77, 77, 0.3)";  // #ff4d4d com opacidade
    if (temp >= 28) return "rgba(255, 204, 0, 0.3)"; // #ffcc00 com opacidade
    if (temp >= 20) return "rgba(254, 246, 143, 0.3)"; // #fef68f com opacidade
    return "rgba(179, 217, 255, 0.3)"; // #b3d9ff com opacidade
  };

  // Filtra as horas para mostrar apenas as do dia de hoje
  const todayHourlyForecast = hourly.time
    .map((time, index) => ({
      time: new Date(time),
      temperature: hourly.temperature_2m[index],
      weathercode: hourly.weathercode[index],
    }))
    .filter(hour => hour.time.toISOString().startsWith(today));

  return (
    <section className="bg-white py-28">
      <ContainerGrid>
        <Heading_2 title="Clima em Inconfidentes" />

        {/* Card Principal - Agora com dados dinâmicos */}
        <div
          className="relative w-full h-auto min-h-96 flex flex-col md:flex-row items-center justify-around text-white rounded-4xl overflow-hidden my-8 p-8 gap-8"
          style={{ backgroundImage: 'url("/images/bgTemperature.png")', backgroundSize: 'cover' }}
        >
          <div
            className="absolute top-0 left-0 z-10 w-full h-full transition-colors duration-300"
            style={{ backgroundColor: bgColor(cw.temperature) }}
          />
          <div className="relative z-20 flex flex-col gap-4">
            <h3 className="text-5xl font-bold">Inconfidentes</h3>
            <ul className="flex flex-col sm:flex-row items-start sm:items-center gap-x-8 gap-y-2">
              <li>{formatDate(cw.time)}</li>
              <li>Atualizado às {new Date(cw.time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</li>
            </ul>
            <ul className="grid grid-cols-2 gap-4 mt-4">
              <li className="flex items-center gap-2">
                <Image src={"/icons/vento.svg"} width={24} height={24} alt="Vento" className="p-1 bg-verde-claro/80 rounded-full" />
                <h6>Vento {cw.windspeed} Km/h</h6>
              </li>
               <li className="flex items-center gap-2">
                <span className="text-2xl">{weatherIconMap[cw.weathercode] || '❔'}</span>
                <h6>{weatherCodeMap[cw.weathercode] || 'Não disponível'}</h6>
              </li>
            </ul>
          </div>

          <div className="relative z-20 flex flex-col items-center bg-verde-claro/90 p-6 text-white rounded-2xl text-center shadow-lg">
            <span className="absolute -top-3 bg-green-900 rounded-full px-3 py-1 text-sm font-semibold">Agora</span>
            <span className="text-6xl font-bold">{Math.round(cw.temperature)}°C</span>
            <span className="text-lg">{weatherCodeMap[cw.weathercode]}</span>
            <span className="mt-2 text-base">
              Máx: {Math.round(daily.temperature_2m_max[0])}°C / Min: {Math.round(daily.temperature_2m_min[0])}°C
            </span>
          </div>
        </div>

        {/* Seção de Previsão */}
        <div>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setView("today")}
              className={`px-4 py-2 rounded-lg transition-colors ${view === 'today' ? 'bg-green-700 text-white' : 'bg-gray-200 text-black'}`}
            >
              Hoje
            </button>
            <button
              onClick={() => setView("weekly")}
              className={`px-4 py-2 rounded-lg transition-colors ${view === 'weekly' ? 'bg-green-700 text-white' : 'bg-gray-200 text-black'}`}
            >
              Próximos 7 dias
            </button>
          </div>

          <Swiper slidesPerView={'auto'} spaceBetween={16} className="w-full">
            {view === "today" && todayHourlyForecast.map((hour, idx) => (
              <SwiperSlide key={idx} style={{ width: '150px' }}>
                <div className="bg-lime-50 rounded-lg p-4 text-center flex flex-col items-center h-full">
                  <h3 className="font-bold text-lg">{hour.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</h3>
                  <p className="text-4xl my-2">{weatherIconMap[hour.weathercode] || '❔'}</p>
                  <p className="font-semibold text-xl">{Math.round(hour.temperature)}°C</p>
                  <p className="text-xs text-gray-600 mt-1">{weatherCodeMap[hour.weathercode]}</p>
                </div>
              </SwiperSlide>
            ))}

            {view === "weekly" && daily.time.map((day, idx) => (
              <SwiperSlide key={idx} style={{ width: '180px' }}>
                <div className="bg-gray-100 rounded-lg p-4 text-center flex flex-col items-center h-full">
                  <h3 className="font-bold">{new Date(day + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}</h3>
                  <p className="text-4xl my-2">{weatherIconMap[daily.weathercode[idx]] || '❔'}</p>
                  <p className="font-semibold">
                    <span className="text-red-500">{Math.round(daily.temperature_2m_max[idx])}°</span> / <span className="text-blue-500">{Math.round(daily.temperature_2m_min[idx])}°</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{weatherCodeMap[daily.weathercode[idx]]}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </ContainerGrid>
    </section>
  );
}