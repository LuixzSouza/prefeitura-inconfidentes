// lib/weatherUtils.js

// Mapeamentos de dados da API
export const weatherCodeMap = {
  0: "Céu limpo", 1: "Predominantemente limpo", 2: "Parcialmente nublado", 3: "Nublado",
  45: "Nevoeiro", 48: "Nevoeiro com geada",
  51: "Garoa leve", 53: "Garoa moderada", 55: "Garoa densa",
  61: "Chuva fraca", 63: "Chuva moderada", 65: "Chuva forte",
  80: "Pancadas de chuva fracas", 81: "Pancadas de chuva moderadas", 82: "Pancadas de chuva violentas",
  95: "Trovoada", 96: "Trovoada com granizo", 99: "Trovoada com granizo forte"
};

export const weatherIconMap = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  80: "🌦️", 81: "🌦️", 82: "⛈️",
  95: "⛈️", 96: "🌨️", 99: "🌨️"
};

// Funções de formatação e estilo
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Adiciona o fuso horário para garantir a data correta
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Sao_Paulo'
  }).format(date);
};

export const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export const getBgColor = (temp) => {
  if (temp >= 35) return "rgba(255, 77, 77, 0.15)";   // Muito quente
  if (temp >= 28) return "rgba(255, 204, 0, 0.15)";  // Quente
  if (temp >= 20) return "rgba(254, 246, 143, 0.15)";// Agradável
  return "rgba(179, 217, 255, 0.2)";               // Frio
};