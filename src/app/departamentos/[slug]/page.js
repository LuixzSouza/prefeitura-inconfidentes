// app/departamentos/[slug]/page.js

import React from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { departamentosData } from '@/data/departamentosData';
import { listNav } from '@/data/navigationData';
import {
  Phone,
  Mail,
  MapPin,
  Users,
  Clock,
  FileText,
  Bot,
  Construction,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

// Função que busca os dados detalhados
async function getDepartamento(slug) {
  return departamentosData.find((d) => d.slug === slug);
}

// Função que busca informações básicas no menu de navegação
async function getNavInfo(slug) {
  for (const navItem of listNav) {
    if (navItem.dropdown) {
      const found = navItem.dropdown.find(
        (sub) => sub.url === `/departamentos/${slug}`
      );
      if (found) {
        const icon =
          departamentosData.find((d) => d.slug === slug)?.icone ||
          <Briefcase size={48} />;
        return { nome: found.title, icone: icon };
      }
    }
  }
  return null;
}

// Página principal do departamento
export default async function DepartamentoDetailPage(props) {
  const { slug } = await props.params;

  // tenta buscar dados completos
  const deptoDetalhado = await getDepartamento(slug);

  // se não achar dados, tenta navInfo ou 404
  if (!deptoDetalhado) {
    const navInfo = await getNavInfo(slug);
    if (!navInfo) {
      notFound();
    }
    // renderiza "em construção"
    return (
      <div className="bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b-2 border-gray-100 pb-6 mb-8">
              <div className="text-emerald-600 bg-emerald-100 p-4 rounded-full">
                {React.cloneElement(navInfo.icone, { size: 48 })}
              </div>
              <div>
                <p className="text-lg font-semibold text-emerald-700">
                  Departamento de
                </p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
                  {navInfo.nome}
                </h1>
              </div>
            </header>
            <PaginaEmConstrucao />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // se tiver dados, renderiza tudo
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b-2 border-gray-100 pb-6 mb-8">
            <div className="text-emerald-600 bg-emerald-100 p-4 rounded-full">
              {React.cloneElement(deptoDetalhado.icone, { size: 48 })}
            </div>
            <div>
              <p className="text-lg font-semibold text-emerald-700">
                Departamento de
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
                {deptoDetalhado.nome}
              </h1>
            </div>
          </header>
          <div className="space-y-10">
            <InfoPrincipal depto={deptoDetalhado} />
            {deptoDetalhado.linkCompetencias && (
              <Competencias link={deptoDetalhado.linkCompetencias} />
            )}
            {deptoDetalhado.competenciasTexto && (
              <Competencias texto={deptoDetalhado.competenciasTexto} />
            )}
            {deptoDetalhado.setores?.length > 0 && (
              <Setores setores={deptoDetalhado.setores} />
            )}
            {deptoDetalhado.secoesEspeciais?.length > 0 && (
              <SecoesEspeciais secoes={deptoDetalhado.secoesEspeciais} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// --- Sub-componentes ---

const PaginaEmConstrucao = () => (
  <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border-2 border-dashed">
    <Construction size={48} className="mx-auto text-emerald-500" />
    <h2 className="mt-4 text-2xl font-bold text-gray-800">
      Página em Construção
    </h2>
    <p className="text-gray-600 mt-2 max-w-md mx-auto">
      O conteúdo detalhado para este departamento está sendo preparado e será
      disponibilizado em breve. Agradecemos a sua compreensão.
    </p>
  </div>
);

const InfoPrincipal = ({ depto }) => (
  <section>
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Informações Gerais
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {depto.responsavel && (
        <InfoCard
          icon={<Users />}
          label="Chefe do Departamento"
          value={depto.responsavel}
        />
      )}
      {depto.horario && (
        <InfoCard
          icon={<Clock />}
          label="Horário de Atendimento"
          value={depto.horario}
        />
      )}
      {depto.telefone && (
        <InfoCard
          icon={<Phone />}
          label="Telefone"
          value={depto.telefone}
          href={`tel:${depto.telefone.replace(/\D/g, '')}`}
        />
      )}
      {depto.email && (
        <InfoCard
          icon={<Mail />}
          label="E-mail"
          value={depto.email}
          href={`mailto:${depto.email}`}
        />
      )}
      {depto.whatsapp && (
        <InfoCard
          icon={<Bot />}
          label="Whatsapp"
          value={`(35) ${depto.whatsapp.slice(2, 7)}-${depto.whatsapp.slice(
            7
          )}`}
          href={`https://wa.me/55${depto.whatsapp}`}
        />
      )}
      {depto.endereco && (
        <InfoCard
          icon={<MapPin />}
          label="Endereço"
          value={depto.endereco}
          fullWidth
        />
      )}
    </div>
  </section>
);

const Competencias = ({ link, texto }) => (
  <section>
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Competências</h2>
    {link && (
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
      >
        Visualizar Competências
      </Link>
    )}
    {texto && (
      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{texto}</p>
    )}
  </section>
);

const Setores = ({ setores }) => (
  <section>
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Setores Vinculados
    </h2>
    <div className="space-y-4">
      {setores.map((setor, i) => (
        <div
          key={i}
          className="bg-gray-50 border-l-4 border-emerald-400 p-4 rounded-r-lg"
        >
          <h3 className="font-bold text-lg text-emerald-800">{setor.nome}</h3>
          {setor.responsavel && (
            <p className="text-sm text-gray-600">
              <strong>Responsável:</strong> {setor.responsavel}
            </p>
          )}
          {setor.horario && (
            <p className="text-sm text-gray-600">
              <strong>Horário:</strong> {setor.horario}
            </p>
          )}
          {setor.telefone && (
            <p className="text-sm text-gray-600">
              <strong>Telefone:</strong> {setor.telefone}
            </p>
          )}
          {setor.email && (
            <p className="text-sm text-gray-600">
              <strong>E-mail:</strong> {setor.email}
            </p>
          )}
          {setor.endereco && (
            <p className="text-sm text-gray-600">
              <strong>Endereço:</strong> {setor.endereco}
            </p>
          )}
        </div>
      ))}
    </div>
  </section>
);

const SecoesEspeciais = ({ secoes }) => (
  <section>
    {secoes.map((secao, i) => (
      <div key={i} className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {secao.titulo}
        </h2>

        {secao.tipo === 'lista-pessoas' && (
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg">
            {secao.itens.map((item, j) => (
              <li key={j}>
                <span className="font-semibold">{item.cargo}:</span>{' '}
                {item.nome}
              </li>
            ))}
          </ul>
        )}

        {secao.tipo === 'lista-documentos' && (
          <div className="space-y-2">
            {secao.itens.map((item, j) => (
              <a
                key={j}
                href={item.url}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <FileText size={16} className="text-emerald-500" />
                {item.texto}
              </a>
            ))}
          </div>
        )}

        {secao.tipo === 'grupo-documentos' && (
          <div className="space-y-4">
            {secao.subsecoes.map((sub, k) => (
              <div key={k}>
                <h3 className="font-semibold text-lg text-gray-700 mb-2">
                  {sub.titulo}
                </h3>
                <div className="space-y-2">
                  {sub.itens.map((item, l) => (
                    <a
                      key={l}
                      href={item.url}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      <FileText size={16} className="text-emerald-500" />
                      {item.texto}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </section>
);

const InfoCard = ({ icon, label, value, href, fullWidth = false }) => (
  <div className={`bg-gray-50 p-4 rounded-lg ${fullWidth ? 'md:col-span-2' : ''}`}>
    <p className="font-semibold text-gray-500 text-sm flex items-center gap-2">
      {icon} {label}
    </p>
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-700 text-lg font-medium hover:underline"
      >
        {value}
      </a>
    ) : (
      <p className="text-gray-800 text-lg font-medium">{value}</p>
    )}
  </div>
);
