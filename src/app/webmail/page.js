// app/webmail/page.js

"use client"; // Componente de cliente para interatividade do formulário

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 1. Importe o useRouter
import { Mail, Lock, LogIn } from 'lucide-react';

const WebmailPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // 2. Inicialize o router

  const handleLogin = (e) => {
    e.preventDefault();
    // No futuro, aqui entraria a lógica real de autenticação
    console.log({ email, password });
    
    // 3. Redireciona para o painel de controle
    router.push('/painel'); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        
        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Image 
              width={200} 
              height={67} 
              alt="Logo da Prefeitura de Inconfidentes" 
              src="/images/logo_home.png" // Garanta que o caminho para o logo esteja correto
              className="mx-auto"
            />
            <h1 className="mt-6 text-2xl font-bold text-gray-800">Acesso ao Webmail</h1>
            <p className="text-sm text-gray-500">Exclusivo para servidores municipais.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo de E-mail */}
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                placeholder="seu-email@inconfidentes.mg.gov.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            {/* Campo de Senha */}
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    Lembrar-me
                </label>
                <a href="#" className="font-semibold text-emerald-600 hover:underline">
                    Esqueceu sua senha?
                </a>
            </div>

            {/* Botão de Login */}
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg"
            >
              <LogIn size={20} />
              Entrar
            </button>
          </form>
        </div>

        {/* Link para voltar */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-emerald-700 hover:underline">
            &larr; Voltar para o site principal
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default WebmailPage;