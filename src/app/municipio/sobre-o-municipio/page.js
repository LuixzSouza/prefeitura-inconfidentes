import React from 'react';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// Ícone para ilustrar as seções (opcional, mas recomendado para um bom design)
// Você pode usar uma biblioteca como 'lucide-react' ou 'heroicons'
// Ex: npm install lucide-react
import { MapPin, Mountain, Droplets, BookOpen, Scaling } from 'lucide-react';

const SobreMunicipioPage = () => {
  const primaryColor = 'text-emerald-700';
  const borderColor = 'border-emerald-600';

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Título Principal */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Conheça Nossas Raízes</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Sobre o Município de Inconfidentes
          </h1>
        </div>

        {/* Card de Dados Gerais */}
        <section className="mb-12 bg-white p-8 rounded-xl shadow-lg transition-shadow hover:shadow-2xl">
          <div className="flex items-center mb-4">
            <MapPin className={`w-8 h-8 mr-3 ${primaryColor}`} />
            <h2 className={`text-3xl font-bold ${primaryColor}`}>Dados Gerais</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-lg">
            <li className="bg-emerald-50 p-4 rounded-lg"><strong>REGIÃO:</strong> Sul de Minas</li>
            <li className="bg-emerald-50 p-4 rounded-lg"><strong>POPULAÇÃO:</strong> 7.358 (IBGE 2020)</li>
            <li className="bg-emerald-50 p-4 rounded-lg"><strong>ÁREA:</strong> 149,467 km²</li>
            <li className="bg-emerald-50 p-4 rounded-lg"><strong>ALTITUDE MÉDIA:</strong> 869 m</li>
          </ul>
        </section>

        {/* Grid para outras seções */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div className="space-y-10">
            {/* Caracterização e Geografia */}
            <CardSection icon={<BookOpen size={24} />} title="Caracterização e Geografia">
              <p>
                Localizada a 869 metros de altitude no Sul de Minas, Inconfidentes possui um clima tropical de altitude (Cwb) com média anual de 18°C. O município se assenta em uma área de 149,467 km², tendo o Rio Mogi-Guaçu como principal curso d’água.
              </p>
              <p>
                Geologicamente, seu território é rico e diverso, com rochas do grupo Andrelândia ao norte e granito-gnáissicas ao sul. A região abriga jazidas minerais de feldspato, quartzo, caulim, apatita e areia.
              </p>
            </CardSection>

            {/* Relevo */}
            <CardSection icon={<Mountain size={24} />} title="Relevo">
              <p>
                Integrado ao Planalto Sul de Minas, o relevo de Inconfidentes é acidentado e marcado por serras. Ao norte, a Serra da Peroba apresenta colinas e vales, com altitude média de 1.050 metros. Ao sul do Rio Mogi Guaçu, o relevo é mais serrano, com espigões e picos que chegam ao ponto mais elevado do município, a Serra das Posses, com 1465 metros de altitude.
              </p>
            </CardSection>

            {/* Hidrografia */}
            <CardSection icon={<Droplets size={24} />} title="Hidrografia">
              <p>
                O município é abençoado com inúmeras nascentes que formam a bacia do Rio Mogi Guaçu. Seus afluentes mais importantes incluem, na margem direita, o Ribeirão Santa Isabel e o Córrego da Onça, e na margem esquerda, o Rio Espraiado, Córrego do Pessegueiro e Córrego Grande.
              </p>
            </CardSection>
          </div>
          
          {/* Coluna de Distâncias e Limites */}
          <div className="space-y-10">
             {/* Limites */}
            <CardSection icon={<MapPin size={24} />} title="Posição e Limites">
              <p>
                Situada nas coordenadas 22° 19' 00" S e 46° 19' 40" W, Inconfidentes faz divisa com os municípios de Bueno Brandão, Ouro Fino, Borda da Mata e Bom Repouso. A cidade está a apenas 10,8 km de Ouro Fino.
              </p>
            </CardSection>

            {/* Distâncias */}
            <section className="bg-white p-6 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
              <div className="flex items-center mb-4">
                  <Scaling className={`w-6 h-6 mr-3 ${primaryColor}`} />
                  <h3 className={`text-2xl font-bold ${primaryColor}`}>Distâncias Estratégicas</h3>
              </div>
              <p className="mb-6 text-base text-gray-600">
                A distância da capital do estado, Belo Horizonte, é de <strong>444,4 km</strong>.
              </p>
              <div className="space-y-6">
                <DistanceTable title="Centros Nacionais" data={[
                  { city: 'São Paulo', dist: '186,6 km' },
                  { city: 'Rio de Janeiro', dist: '426,5 km' },
                  { city: 'Belo Horizonte', dist: '444,4 km' },
                  { city: 'Brasília', dist: '972,8 km' },
                ]} />
                <DistanceTable title="Polos Regionais" data={[
                  { city: 'Pouso Alegre', dist: '48,6 km' },
                  { city: 'Poços de Caldas', dist: '94,6 km' },
                  { city: 'Itajubá', dist: '114,6 km' },
                  { city: 'Varginha', dist: '169,0 km' },
                ]} />
              </div>
            </section>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

// Componente auxiliar para os cards de seção
const CardSection = ({ icon, title, children }) => (
  <section className="bg-white p-6 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
    <div className="flex items-center mb-4">
      <span className="text-emerald-600">{icon}</span>
      <h3 className="ml-3 text-2xl font-bold text-emerald-700">{title}</h3>
    </div>
    <div className="space-y-4 text-gray-700 text-base leading-relaxed">
      {children}
    </div>
  </section>
);

// Componente auxiliar para as tabelas de distância
const DistanceTable = ({ title, data }) => (
  <div>
    <h4 className="font-semibold text-lg text-gray-700 mb-2">{title}</h4>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-emerald-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left font-semibold">Destino</th>
            <th className="py-2 px-4 text-right font-semibold">Distância</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-emerald-50/50' : ''}>
              <td className="py-2 px-4">{item.city}</td>
              <td className="py-2 px-4 text-right font-mono">{item.dist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SobreMunicipioPage;