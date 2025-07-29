// src/app/users/page.js

import { db } from '@/lib/db'; 

async function getUsers() {
  try {
    const { rows } = await db.query('SELECT id, name, email FROM users ORDER BY name;');
    return rows;
  } catch (error) {
    console.error('Erro ao buscar usuários do banco de dados:', error);
    return [];
  }
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '40px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        🚀 Lista de Usuários (Página Dedicada)
      </h1>
      {users.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{user.name}</p>
              <p style={{ margin: 0, color: '#555' }}>{user.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário encontrado ou houve um erro na conexão com o banco.</p>
      )}
    </main>
  );
}