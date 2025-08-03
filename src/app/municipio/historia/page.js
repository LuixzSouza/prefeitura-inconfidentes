import React from 'react';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// Ícones para ilustrar cada marco na linha do tempo
import { Map, Users, Church, School2, Award, Gavel } from 'lucide-react';

const HistoriaPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Título Principal */}
        <div className="text-center mb-16">
          <p className="text-lg font-semibold text-emerald-600">Uma Jornada no Tempo</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            A História de Inconfidentes
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Dos bandeirantes à emancipação, descubra os marcos que construíram nossa cidade.
          </p>
        </div>

        {/* Container da Linha do Tempo */}
        <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
          {/* Linha vertical central */}
          <div className="absolute left-1/2 -ml-1 h-full border-2 border-emerald-200 rounded-full"></div>

          {/* Item: Origens */}
          <TimelineItem 
            position="left" 
            icon={<Map className="w-6 h-6 text-white"/>} 
            date="Primórdios"
            title="As Origens Bandeirantes"
          >
            Os primeiros habitantes da região foram os bandeirantes, que se instalaram às margens do Rio Mogi Guaçu em busca de ouro. Com a mineração não prosperando, o povoado, então chamado `&quot;`Mogi Acima`&quot;`, voltou-se para a agricultura.
          </TimelineItem>

          {/* Item: Fundação do Núcleo Colonial */}
          <TimelineItem 
            position="right" 
            icon={<Users className="w-6 h-6 text-white"/>} 
            date="1910"
            title="Criação do Núcleo Colonial"
          >
            Por iniciativa do então Presidente de Minas, Júlio Bueno Brandão, o Governo Federal instalou a colônia em 22 de maio de 1910. As terras foram divididas em 205 lotes e distribuídas a colonos de diversas nacionalidades europeias, que deram início a uma nova fase de povoamento.
          </TimelineItem>

          {/* Item: Construção da Capela */}
          <TimelineItem 
            position="left" 
            icon={<Church className="w-6 h-6 text-white"/>} 
            date="1912"
            title="O Marco da Fé"
          >
            A construção da capela foi iniciada pelo Dr. Antônio de Arantes Bueno, diretor do núcleo. Este ato consolidou não apenas a fé, mas também um ponto de encontro e referência para a crescente comunidade.
          </TimelineItem>

          {/* Item: Chegada do Patronato Agrícola */}
          <TimelineItem 
            position="right" 
            icon={<School2 className="w-6 h-6 text-white"/>} 
            date="1920"
            title="O Berço da Educação"
          >
            A transferência do Patronato Agrícola Visconde de Mauá do Rio de Janeiro para Inconfidentes foi um ponto de virada, fortalecendo a vocação agrícola e educacional da cidade. Essa instituição evoluiu para se tornar o que hoje é o prestigiado Instituto Federal Sul de Minas – Campus Inconfidentes.
          </TimelineItem>

          {/* Item: Distrito de Paz */}
          <TimelineItem 
            position="left" 
            icon={<Award className="w-6 h-6 text-white"/>} 
            date="1953"
            title="Elevação a Distrito"
          >
            Através da Lei Estadual n.º 1039/53, o Núcleo Colonial foi elevado a Distrito de Paz, um reconhecimento oficial do seu crescimento e organização, e um passo fundamental para a futura autonomia.
          </TimelineItem> {/* <-- A CORREÇÃO FOI FEITA AQUI */}
          
          {/* Item: Emancipação */}
          <TimelineItem 
            position="right" 
            icon={<Gavel className="w-6 h-6 text-white"/>} 
            date="1962 - 1963"
            title="A Emancipação do Município"
          >
            Com a economia favorável, a Lei n.º 2764 de 30 de dezembro de 1962 criou o Município de Inconfidentes. A instalação oficial ocorreu em 1º de março de 1963, com o Sr. Remo Morganti como intendente, seguido pelo primeiro prefeito eleito, Sr. Rogério Bernardes de Souza.
          </TimelineItem>

        </div>
        
        {/* Fonte */}
        <div className="text-center mt-12">
            <p className="text-sm text-gray-500 italic">Fonte: Leyde Moraes Guimarães</p>
        </div>

      </main>
      <Footer />
    </div>
  );
};

// --- Componente Auxiliar para cada item da Linha do Tempo ---
const TimelineItem = ({ position, icon, date, title, children }) => {
  const isLeft = position === 'left';
  const alignment = isLeft ? 'md:text-right' : 'md:text-left';
  const order = isLeft ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <div className={`mb-8 flex md:justify-between items-center w-full ${order}`}>
      {/* Espaço em branco em uma das metades */}
      <div className="hidden md:block w-5/12"></div>
      
      {/* Ícone central */}
      <div className="z-10 flex items-center bg-emerald-500 w-12 h-12 rounded-full shadow-lg shrink-0">
        <div className="mx-auto">
          {icon}
        </div>
      </div>

      {/* Card de conteúdo */}
      <div className={`bg-white rounded-xl shadow-lg w-full md:w-5/12 p-6`}>
        <p className={`mb-2 text-sm font-semibold text-emerald-600 ${alignment}`}>{date}</p>
        <h3 className={`text-xl font-bold text-gray-800 mb-2 ${alignment}`}>{title}</h3>
        <p className={`text-gray-700 leading-relaxed ${alignment}`}>{children}</p>
      </div>
    </div>
  );
};


export default HistoriaPage;