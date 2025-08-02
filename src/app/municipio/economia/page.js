import React from 'react';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// Ícones da biblioteca 'lucide-react' para enriquecer a interface
import { 
  Briefcase, 
  ShoppingBag, 
  Sprout, 
  HandPlatter, 
  ScrollText, 
  Building2,
  Wrench
} from 'lucide-react';

const EconomiaPage = () => {
  const primaryColor = 'text-emerald-700';

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Título Principal */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Desenvolvimento e Oportunidade</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Economia de Inconfidentes
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Uma economia pulsante, movida pelo turismo, pela força do agronegócio e pela tradição da indústria têxtil.
          </p>
        </div>

        {/* Pilares da Economia */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Nossos Pilares Econômicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <PillarCard
              icon={<ShoppingBag size={40} className="mx-auto text-emerald-600" />}
              title="Turismo e Comércio"
              description="Atraindo visitantes para compras e peregrinação, movimentando hotéis, restaurantes e o artesanato local."
            />
            <PillarCard
              icon={<Briefcase size={40} className="mx-auto text-emerald-600" />}
              title="Indústria Têxtil"
              description="Referência em crochê, malharias e linhas, unindo tradição artesanal com tecnologia e inovação."
            />
            <PillarCard
              icon={<Sprout size={40} className="mx-auto text-emerald-600" />}
              title="Agronegócio"
              description="Produção diversificada com destaque para o café, alho, leite e bucha vegetal, abastecendo Minas e São Paulo."
            />
          </div>
        </section>

        {/* História Econômica */}
        <CardSection icon={<ScrollText size={24} />} title="Origem e Tradição">
          <p>
            Tudo começou em 1909, com a criação de uma colônia agrícola para estrangeiros. Os primeiros habitantes, atraídos pelo ouro, estabeleceram-se às margens do Rio Mogi-Guaçu. Enquanto os homens se dedicavam às lavouras, as mulheres teciam o futuro da cidade com o crochê. Essa arte manual ganhou notoriedade e se transformou em uma das principais fontes de renda, um legado mantido até hoje.
          </p>
        </CardSection>
        
        {/* Detalhes Socioeconômicos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          <div className="space-y-10">
            <CardSection icon={<HandPlatter size={24} />} title="Indústria Têxtil e Artesanato">
              <p>
                A indústria têxtil e o artesanato são o coração da economia local. Empresas de linhas, tapetes e fibras investem em tecnologia para inovar e expandir mercados. A produção de crochê, tear e bordados cresce com a demanda, impulsionada por eventos, marketing de qualidade e a criatividade das malharias locais, que superam desafios com dinamismo.
              </p>
            </CardSection>

            <CardSection icon={<Building2 size={24} />} title="Comércio e Serviços">
              <p>
                Inconfidentes possui um comércio robusto, com estabelecimentos varejistas e atacadistas que atendem praticamente todas as necessidades da população, de alimentos a produtos farmacêuticos. O setor de serviços também é diversificado, oferecendo desde buffets e locações a consultórios e clínicas especializadas.
              </p>
            </CardSection>
          </div>

          <div className="flex">
            <CardSection icon={<Sprout size={24} />} title="Agropecuária">
              <p>
                A atividade agropecuária é bastante diversificada, com destaque para a produção de café, leite, alho, feijão e milho. Mesmo com um relevo acidentado que desafia a mecanização, o município apresenta uma expressiva área cultivada, com produção comercializada principalmente em Minas Gerais e São Paulo.
              </p>
              <h4 className="font-semibold text-lg pt-2 text-emerald-800">Características do Sistema Produtivo:</h4>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Estrutura baseada em pequenas propriedades (minifúndios).</li>
                <li>Mão de obra predominantemente familiar.</li>
                <li>Exploração direta dos estabelecimentos rurais.</li>
                <li>Assistência técnica da EMATER para aumento da produtividade.</li>
              </ul>
            </CardSection>
          </div>
        </div>

        {/* Infraestrutura */}
        <div className="mt-16">
            <CardSection icon={<Wrench size={24} />} title="Infraestrutura e Suporte">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfraItem title="Energia" value="CEMIG" />
                    <InfraItem title="Água e Saneamento" value="COPASA e Prefeitura" />
                    <InfraItem title="Telefonia Fixa e Móvel" value="Oi e VIVO" />
                    <InfraItem title="Transporte" value="Expresso Gardênia" />
                    <InfraItem title="Imprensa" value="Jornal de Inconfidentes e Rádio Inconfidentes FM" />
                    <InfraItem title="Serviços Postais" value="Agência dos Correios" />
                    <InfraItem title="Serviços Bancários" value="Casa Lotérica, Banco do Brasil e Bradesco" />
                </div>
            </CardSection>
        </div>

      </main>
      <Footer />
    </div>
  );
};

// --- Componentes Auxiliares ---

const PillarCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    {icon}
    <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// CORREÇÃO APLICADA AQUI: removi a classe 'h-full'
const CardSection = ({ icon, title, children }) => (
  <section className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
    <div className="flex items-center mb-4">
      <span className="text-emerald-600">{icon}</span>
      <h3 className="ml-3 text-2xl font-bold text-emerald-700">{title}</h3>
    </div>
    <div className="space-y-4 text-gray-700 text-base leading-relaxed">
      {children}
    </div>
  </section>
);

const InfraItem = ({ title, value }) => (
    <div className="bg-emerald-50/70 p-4 rounded-lg">
        <p className="font-bold text-emerald-800">{title}</p>
        <p className="text-gray-700">{value}</p>
    </div>
);

export default EconomiaPage;