import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { Calendar, Clock } from 'lucide-react'; // Biblioteca de ícones popular, ou use seus próprios SVGs

// Dados de exemplo para a agenda. No futuro, isso pode vir de uma API.
const agendaData = [
  {
    date: 'Segunda-feira, 04 de Agosto de 2025',
    events: [
      { time: '09:00', title: 'Reunião com Secretários Municipais', location: 'Gabinete do Prefeito' },
      { time: '11:30', title: 'Visita à Obra da Nova Escola Municipal', location: 'Bairro Centro' },
      { time: '15:00', title: 'Entrevista para a Rádio Local', location: 'Estúdio da Rádio FM Cidade' },
    ],
  },
  {
    date: 'Terça-feira, 05 de Agosto de 2025',
    events: [
      { time: '10:00', title: 'Encontro com Representantes do Comércio', location: 'Associação Comercial' },
      { time: '14:00', title: 'Despachos Internos', location: 'Gabinete do Prefeito' },
    ],
  },
    // Adicione mais dias e eventos conforme necessário
];


export default function AgendaPrefeitoPage() {
  return (
    <main className="bg-gray-50 flex-1">
        <Header />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Página */}
        <div className="pb-8 border-b border-gray-200 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Agenda do Prefeito
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Acompanhe os compromissos oficiais e as atividades diárias do chefe do executivo municipal.
          </p>
        </div>

        {/* Conteúdo da Agenda */}
        <div className="space-y-12">
          {agendaData.length > 0 ? (
            agendaData.map((day, dayIdx) => (
              <div key={dayIdx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-green-800">
                  <Calendar className="h-6 w-6" />
                  {day.date}
                </h2>
                <ul className="mt-6 space-y-6 border-l-2 border-green-200 ml-3">
                  {day.events.map((event, eventIdx) => (
                    <li key={eventIdx} className="relative pl-8">
                      <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-green-800"></div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-700">{event.time}</span>
                      </div>
                      <h3 className="mt-1 text-base font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-500">{event.location}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-center bg-white p-10 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Nenhum compromisso agendado.</h2>
              <p className="mt-2 text-gray-500">A agenda do prefeito para os próximos dias ainda não foi publicada.</p>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </main>
  );
}