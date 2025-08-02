import React from 'react';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// Ícones para ilustrar as seções (LISTA COM O ÍCONE PROBLEMÁTICO TROCADO)
import { 
  Instagram, 
  ShoppingBasket, 
  UtensilsCrossed, 
  Footprints, 
  Mountain, 
  Church, 
  Trees, 
  Droplets, // SUBSTITUÍ 'Fountain' POR 'Droplets'
  Landmark,
  PersonStanding,
  Grape
} from 'lucide-react';

const TurismoLazerPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Título Principal e CTA */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Descubra, Sinta, Viva</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Turismo e Lazer em Inconfidentes
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Uma cidade acolhedora de 7.358 habitantes, a 186 km de São Paulo, pronta para te receber com o melhor do Sul de Minas.
          </p>
          <a 
            href="https://www.instagram.com/visiteinconfidentes/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            <Instagram size={24} />
            Planeje sua Viagem no Instagram
          </a>
        </div>

        {/* Seção dos Pilares do Turismo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <PillarCard 
            icon={<ShoppingBasket size={32} />}
            title="Capital Nacional do Crochê"
            description="Um paraíso para o turismo de compras, com a maior produção de crochê, malhas, fios e tapetes da região."
          />
          <PillarCard 
            icon={<UtensilsCrossed size={32} />}
            title="Gastronomia Mineira"
            description="Sabores que encantam: queijos, cafés, doces caseiros, pão de queijo e pratos típicos em restaurantes do centro à zona rural."
          />
          <PillarCard 
            icon={<Footprints size={32} />}
            title="A Terra dos Caminhos"
            description="Inconfidentes é o ponto de partida e passagem para 5 rotas de peregrinação, atraindo mais de 15 mil romeiros por ano."
          />
        </div>

        {/* Seção dos Caminhos de Peregrinação */}
        <Section title="A Terra dos Caminhos de Peregrinação">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CaminhoCard title="Caminho da Fé" description="Início em Águas da Prata (SP), com destino final em Aparecida (SP)." />
            <CaminhoCard title="Caminho de Nhá Chica" description="Início em Inconfidentes, com destino final em Baependi (MG)." />
            <CaminhoCard title="Caminho Graças e Prosas" description="Rota semicircular com início em Inconfidentes e fim em Ouro Fino (MG)." />
            <CaminhoCard title="Caminho das Capelas" description="Rota circular que percorre 21 capelas rurais, começando e terminando na matriz." />
            <CaminhoCard title="Caminho da Prece" description="Início em Jacutinga (MG), com destino final em Borda da Mata (MG)." />
             <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg flex items-center">
              <p className="text-emerald-800">Cada caminho oferece uma jornada única de fé, superação e contato com a natureza.</p>
            </div>
          </div>
        </Section>
        
        {/* Seção de Atrativos Turísticos */}
        <Section title="Principais Atrativos Turísticos">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <AtrativoItem icon={<Mountain />} name="Trilha - Torre do Monjolinho" />
            <AtrativoItem icon={<Landmark />} name="Praça Tiradentes" />
            <AtrativoItem icon={<Trees />} name="Árvores de Crochê (Av. Alvarenga Peixoto)" />
            <AtrativoItem icon={<Grape />} name="Cachoeira do Pulo" />
            <AtrativoItem icon={<Grape />} name="Cachoeira do Galera" />
            <AtrativoItem icon={<Grape />} name="Cachoeira do Poção" />
            <AtrativoItem icon={<Droplets />} name="Fonte da Praça" /> {/* <-- ÍCONE TROCADO AQUI */}
            <AtrativoItem icon={<Landmark />} name="Coreto da Praça" />
            <AtrativoItem icon={<Church />} name="Igreja São Geraldo Magela" />
            <AtrativoItem icon={<PersonStanding />} name="Monumento O Peregrino" />
          </div>
        </Section>

      </main>
      <Footer />
    </div>
  );
};

// --- Componentes Auxiliares ---

const Section = ({ title, children }) => (
  <section className="mb-16">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      <div className="mt-2 w-20 h-1 bg-emerald-500 mx-auto rounded"></div>
    </div>
    {children}
  </section>
);

const PillarCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
    <div className="inline-block p-4 bg-emerald-100 text-emerald-600 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const CaminhoCard = ({ title, description }) => (
  <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-emerald-500">
    <h4 className="font-bold text-lg text-emerald-800">{title}</h4>
    <p className="text-gray-700 text-sm">{description}</p>
  </div>
);

const AtrativoItem = ({ icon, name }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4 hover:bg-emerald-50 transition-colors">
    <div className="text-emerald-600">{icon}</div>
    <span className="font-semibold text-gray-700">{name}</span>
  </div>
);

export default TurismoLazerPage;