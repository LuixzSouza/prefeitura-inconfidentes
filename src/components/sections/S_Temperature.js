'use client';

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Heading_2 } from "../font/Heading_2";
import { ContainerGrid } from "../layout/ContainerGrid";

const LAT = -22.3133;
const LON = -46.3897;

const weatherCodeMap = {
  0:"Clear sky",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",
  45:"Fog",48:"Depositing rime fog",
  51:"Drizzle light",53:"Drizzle moderate",55:"Drizzle dense",
  61:"Rain slight",63:"Rain moderate",65:"Rain heavy",
  80:"Rain showers slight",81:"Moderate",82:"Violent",
  95:"Thunderstorm slight",96:"Hail slight",99:"Hail heavy"
};

export function S_Temperature() {
  const [data, setData] = useState(null);
  const [view, setView] = useState("today");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?
latitude=${LAT}&longitude=${LON}&current_weather=true&
daily=temperature_2m_max,temperature_2m_min,weathercode&
timezone=America/Sao_Paulo`
      .replace(/\s+/g, "")
    )
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(json => {
      setData(json);
      setLoading(false);
    })
    .catch(err => {
      console.error("Erro ao carregar Open‑Meteo:", err);
      setError("Não foi possível obter os dados do clima.");
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Carregando dados do clima...</p>;
  if (error) return <p style={{color:"red"}}>{error}</p>;

  const cw = data.current_weather;
  const daily = data.daily;

  const bgColor = temp => {
    if (temp >= 35) return "#ff4d4d";
    if (temp >= 28) return "#ffcc00";
    if (temp >= 20) return "#fef68f";
    return "#b3d9ff";
  };

  return (
    <section className="bg-white py-28">
      <ContainerGrid>
        <Heading_2 title="Clima em Inconfidentes"/>

        <div className="w-full h-96" style={{ backgroundColor: bgColor(cw.temperature), transition: '0.3s' }} >

        </div>

        <div style={{ marginTop:"1rem" }}>
          <div style={{ display:"flex", gap:"1rem", marginBottom:"1rem" }}>
            <button onClick={() => setView("today")}>Hoje</button>
            <button onClick={() => setView("weekly")}>Semana</button>
          </div>

          <Swiper slidesPerView={1} spaceBetween={10}>
            {view === "today" && (
              <SwiperSlide>
                <div style={{ background:"#e8ffe3", borderRadius:8, padding:20 }}>
                  <h3>{new Date(cw.time).toLocaleTimeString('pt-BR')}</h3>
                  <p>🌡️ {cw.temperature}°C</p>
                  <p>💨 Vento: {cw.windspeed} km/h</p>
                  <p>💬 {weatherCodeMap[cw.weathercode] || cw.weathercode}</p>
                </div>
              </SwiperSlide>
            )}

            {view === "weekly" && daily.time.map((day, idx) => (
              <SwiperSlide key={idx}>
                <div style={{ background:"#fff", borderRadius:8, padding:20 }}>
                  <p>{new Date(day).toLocaleDateString('pt-BR',{weekday:'short',day:'numeric',month:'short'})}</p>
                  <p>🌡️ Máx: {daily.temperature_2m_max[idx]}°C • Min: {daily.temperature_2m_min[idx]}°C</p>
                  <p>💬 {weatherCodeMap[daily.weathercode[idx]] || daily.weathercode[idx]}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </ContainerGrid>
    </section>
  );
}
