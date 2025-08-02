// src/app/licitacoes/page.js

import { db } from '@/lib/db'; // Seu arquivo de conexão com o banco

// Função que busca os dados no servidor
async function getLicitacoes() {
  try {
    // Query SQL para buscar as licitações, ordenando pelas mais recentes
    const { rows } = await db.query(`
      SELECT id, numero, modalidade, objeto, status, data_abertura 
      FROM licitacoes 
      ORDER BY data_abertura DESC;
    `);
    return rows;
  } catch (error) {
    console.error('Erro ao buscar licitações do banco de dados:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}

// Componente da página (React Server Component)
export default async function LicitacoesPage() {
  const licitacoes = await getLicitacoes();

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '40px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        📄 Licitações Públicas
      </h1>
      {licitacoes.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {licitacoes.map((licitacao) => (
            <li key={licitacao.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {licitacao.modalidade} N° {licitacao.numero}
                </p>
                <span style={{ padding: '4px 8px', borderRadius: '12px', background: '#eee', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {licitacao.status}
                </span>
              </div>
              <p style={{ margin: '0.5rem 0', color: '#333' }}>
                {licitacao.objeto}
              </p>
              <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
                🗓️ **Abertura:** {new Date(licitacao.data_abertura).toLocaleString('pt-BR')}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma licitação encontrada.</p>
      )}
    </main>
  );
}