import React from 'react';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// Importe os ícones que você vai usar
import { 
  HeartPulse, 
  School, 
  Wrench, 
  Landmark, 
  HandHeart, 
  Sprout,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

// --- DADOS DAS SECRETARIAS ---
// Para adicionar ou editar, apenas modifique esta lista de objetos.
const secretariasData = [
  {
    id: 1,
    nome: 'Secretaria de Saúde',
    icone: <HeartPulse size={32} />,
    secretario: 'Nome do(a) Secretário(a)',
    telefone: '(35) 0000-0001',
    email: 'saude@inconfidentes.mg.gov.br',
    endereco: 'Rua da Saúde, 123, Centro',
    descricao: 'Responsável pela gestão da saúde pública, hospitais, postos de saúde e programas de prevenção.'
  },
  {
    id: 2,
    nome: 'Secretaria de Educação',
    icone: <School size={32} />,
    secretario: 'Nome do(a) Secretário(a)',
    telefone: '(35) 0000-0002',
    email: 'educacao@inconfidentes.mg.gov.br',
    endereco: 'Av. dos Estudos, 456, Centro',
    descricao: 'Administra as escolas municipais, creches, transporte escolar e projetos pedagógicos.'
  },
  {
    id: 3,
    nome: 'Secretaria de Obras e Serviços Urbanos',
    icone: <Wrench size={32} />,
    secretario: 'Nome do(a) Secretário(a)',
    telefone: '(35) 0000-0003',
    email: 'obras@inconfidentes.mg.gov.br',
    endereco: 'Pátio Municipal, 789, Bairro Industrial',
    descricao: 'Cuida da manutenção de vias públicas, iluminação, limpeza urbana e infraestrutura da cidade.'
  },
  {
    id: 4,
    nome: 'Secretaria de Administração e Finanças',
    icone: <Landmark size={32} />,
    secretario: 'Nome do(a) Secretário(a)',
    telefone: '(35) 0000-0004',
    email: 'admin@inconfidentes.mg.gov.br',
    endereco: 'Paço Municipal, Praça Tiradentes, 10, Centro',
    descricao: 'Gerencia os recursos humanos, financeiros, licitações e o orçamento do município.'
  },
  {
    id: 5,
    nome: 'Secretaria de Assistência Social',
    icone: <HandHeart size={32} />,
    secretario: 'Nome do(a) Secretário(a)',
    telefone: '(35) 0000-0005',
    email: 'social@inconfidentes.mg.gov.br',
    endereco: 'Rua da Solidariedade, 234, Centro',
    descricao: 'Desenvolve programas de apoio a famílias, idosos, crianças e adolescentes em situação de vulnerabilidade.'
  },
  {
    id: 6,
    nome: 'Secretaria de Agricultura e Meio Ambiente',
    icone: <Sprout size={32} />,
    secretario: 'Nome do(a) Secretário(a)',
    telefone: '(35) 0000-0006',
    email: 'agricultura@inconfidentes.mg.gov.br',
    endereco: 'Estrada Rural Principal, km 2',
    descricao: 'Promove o desenvolvimento agrícola, apoia o produtor rural e zela pela preservação ambiental.'
  },
];


// --- COMPONENTE DA PÁGINA ---
const SecretariasPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Título Principal */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Estrutura Administrativa</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Secretarias Municipais
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Conheça os responsáveis e as funções de cada secretaria que trabalha pelo desenvolvimento de Inconfidentes.
          </p>
        </div>

        {/* Grid de Secretarias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {secretariasData.map(secretaria => (
            <SecretariaCard key={secretaria.id} {...secretaria} />
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
};

// --- COMPONENTE DO CARD ---
const SecretariaCard = ({ icone, nome, secretario, telefone, email, endereco, descricao }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col h-full border-t-4 border-emerald-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-emerald-600">{icone}</div>
          <h2 className="text-2xl font-bold text-gray-800">{nome}</h2>
        </div>
        <p className="text-gray-600 mb-6">{descricao}</p>
        
        <div className="text-center bg-gray-100 p-4 rounded-lg mb-6">
          <p className="font-bold text-gray-800">Secretário(a) Responsável</p>
          <p className="text-emerald-700 text-lg">{secretario}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 border-t border-gray-200 rounded-b-xl">
        <h3 className="font-semibold text-gray-700 mb-3 text-center">Contato</h3>
        <div className="space-y-3 text-sm">
          <a href={`tel:${telefone.replace(/\D/g, '')}`} className="flex items-center gap-3 text-gray-600 hover:text-emerald-600">
            <Phone size={16} className="text-gray-400" />
            <span>{telefone}</span>
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-3 text-gray-600 hover:text-emerald-600">
            <Mail size={16} className="text-gray-400" />
            <span>{email}</span>
          </a>
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin size={16} className="text-gray-400" />
            <span>{endereco}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretariasPage;