// SEU ARQUIVO: S_Temperature.js (Com o novo design aplicado)

'use client';

import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image";

import { Heading_2 } from "../font/Heading_2";
import { ContainerGrid } from "../layout/ContainerGrid";
import { useWeather } from "@/components/hooks/useWeather"; 
import { weatherCodeMap, weatherIconMap, formatDate, getBgColor, formatTime } from "@/lib/weatherUtils";

// --- Subcomponente: Card Principal (Design Renovado) ---
const MainWeatherCard = ({ current, daily }) => (
  <div
    className="relative w-full min-h-[28rem] flex flex-col md:flex-row items-center justify-between text-white rounded-3xl overflow-hidden my-8 p-6 md:p-10 gap-8"
    style={{ backgroundImage: 'url("/images/bgTemperature.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    {/* Overlay de cor dinâmica com base na temperatura */}
    <div
      className="absolute top-0 left-0 z-10 w-full h-full transition-colors duration-500"
      style={{ backgroundColor: getBgColor(current.temperature) }}
    />
    
    {/* Painel Esquerdo com Informações - EFEITO GLASSMORPHISM */}
    <div className="relative z-20 flex flex-col gap-4 bg-black/20 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg w-full md:w-auto">
      <div>
        <h3 className="text-5xl font-bold tracking-tight">Inconfidentes</h3>
        <p className="font-light text-white/90">{formatDate(current.time)}</p>
      </div>
      <div className="w-full h-px bg-white/20 my-2"></div> {/* Divisor */}
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-3">
          <Image src={"/icons/vento.svg"} width={24} height={24} alt="Vento" className="invert p-1"/>
          <span>Vento a <strong>{current.windspeed} km/h</strong></span>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-2xl">{weatherIconMap[current.weathercode] || '❔'}</span>
          <span>{weatherCodeMap[current.weathercode] || 'Não disponível'}</span>
        </li>
        <li className="text-sm font-light text-white/80 mt-2">
          Atualizado às {formatTime(new Date(current.time))}
        </li>
      </ul>
    </div>

    {/* Painel Direito com Temperatura Principal - EFEITO GLASSMORPHISM */}
    <div className="relative z-20 flex flex-col items-center justify-center bg-black/20 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg text-center">
      <p className="text-8xl font-bold">{Math.round(current.temperature)}<span className="text-7xl font-light opacity-80">°C</span></p>
      <p className="mt-2 text-lg">
        <span className="opacity-80">Máx:</span> {Math.round(daily.temperature_2m_max[0])}° 
        <span className="opacity-50 mx-1">/</span> 
        <span className="opacity-80">Mín:</span> {Math.round(daily.temperature_2m_min[0])}°
      </p>
    </div>
  </div>
);

// --- Subcomponente: Seção de Previsão (Design Renovado) ---
const ForecastView = ({ view, setView, hourlyForecast, dailyForecast }) => (
    <div className="mt-12">
      {/* Botões de navegação com estilo de abas */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setView("today")} 
          className={`px-4 py-2 text-lg transition-colors duration-300 ${view === 'today' ? 'border-b-2 border-green-700 text-green-700 font-semibold' : 'text-gray-500'}`}
        >
          Hoje
        </button>
        <button 
          onClick={() => setView("weekly")} 
          className={`px-4 py-2 text-lg transition-colors duration-300 ${view === 'weekly' ? 'border-b-2 border-green-700 text-green-700 font-semibold' : 'text-gray-500'}`}
        >
          Próximos 7 dias
        </button>
      </div>

      <Swiper slidesPerView={'auto'} spaceBetween={16} className="w-full pb-4">
        {view === "today" && hourlyForecast.map((hour, idx) => (
          <SwiperSlide key={idx} style={{ width: '140px' }}>
            {/* Card de previsão horária com gradiente e hover */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center flex flex-col items-center h-full shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h3 className="font-semibold text-gray-800 text-lg">{formatTime(hour.time)}</h3>
              <p className="text-5xl my-3">{weatherIconMap[hour.weathercode] || '❔'}</p>
              <p className="font-bold text-gray-900 text-2xl">{Math.round(hour.temperature)}°C</p>
              <p className="text-xs text-gray-500 mt-2 flex-grow">{weatherCodeMap[hour.weathercode]}</p>
            </div>
          </SwiperSlide>
        ))}
        {view === "weekly" && dailyForecast.time.map((day, idx) => (
          <SwiperSlide key={idx} style={{ width: '160px' }}>
             {/* Card de previsão semanal com gradiente e hover */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center flex flex-col items-center h-full shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h3 className="font-semibold text-gray-800">{new Date(day + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric'})}</h3>
              <p className="text-5xl my-3">{weatherIconMap[dailyForecast.weathercode[idx]] || '❔'}</p>
              <p className="font-bold text-xl">
                <span className="text-red-600">{Math.round(dailyForecast.temperature_2m_max[idx])}°</span>
                <span className="text-gray-400 font-light mx-1">/</span>
                <span className="text-blue-600">{Math.round(dailyForecast.temperature_2m_min[idx])}°</span>
              </p>
              <p className="text-xs text-gray-500 mt-2 flex-grow">{weatherCodeMap[dailyForecast.weathercode[idx]]}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
);


// --- Componente Principal (Orquestrador) ---
export function S_Temperature() {
  const [view, setView] = useState("today");
  const { data, loading, error } = useWeather();

  const todayHourlyForecast = useMemo(() => {
    if (!data) return [];
    const todayISO = data.daily.time[0];
    return data.hourly.time
      .map((time, index) => ({
        time: new Date(time),
        temperature: data.hourly.temperature_2m[index],
        weathercode: data.hourly.weathercode[index],
      }))
      .filter(hour => hour.time.toISOString().startsWith(todayISO));
  }, [data]);

  if (loading) return (
    <section className="bg-white py-28 flex justify-center items-center">
        <p>Carregando dados do clima...</p>
    </section>
  );
  if (error) return (
    <section className="bg-white py-28 flex justify-center items-center">
        <p className="text-red-500">{error}</p>
    </section>
  );
  if (!data) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <ContainerGrid>
        <Heading_2 title="Clima em Inconfidentes" />
        <MainWeatherCard 
            current={data.current_weather} 
            daily={data.daily} 
        />
        <ForecastView 
            view={view}
            setView={setView}
            hourlyForecast={todayHourlyForecast}
            dailyForecast={data.daily}
        />
      </ContainerGrid>
    </section>
  );
}