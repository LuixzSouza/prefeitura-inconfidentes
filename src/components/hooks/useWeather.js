// hooks/useWeather.js
'use client';

import { useEffect, useState } from "react";

const LAT = -22.3133;
const LON = -46.3897;

export function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          latitude: LAT,
          longitude: LON,
          current_weather: true,
          daily: 'temperature_2m_max,temperature_2m_min,weathercode',
          hourly: 'temperature_2m,weathercode',
          timezone: 'America/Sao_Paulo',
        });

        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
        if (!res.ok) {
            throw new Error(`Erro na resposta da API: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Erro ao carregar Open-Meteo:", err);
        setError("Não foi possível obter os dados do clima.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []); // A dependência vazia garante que o fetch ocorra apenas uma vez.

  return { data, loading, error };
}