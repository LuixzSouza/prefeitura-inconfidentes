"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // ⬅️ 1. Importe o signIn
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const WebmailPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // ⬅️ 2. Estado para mensagem de erro
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      // 3. Usa a função signIn do NextAuth
      const result = await signIn('credentials', {
        redirect: false, // Importante para lidar com erros manualmente
        email: email,
        password: password,
      });

      if (result.error) {
        // Se houver erro (usuário/senha inválidos), atualiza a mensagem
        setError('Email ou senha inválidos. Tente novamente.');
        console.error(result.error);
      } else {
        // Se o login for bem-sucedido, redireciona para o painel
        router.push('/painel');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente mais tarde.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Image 
              width={200} height={67} alt="Logo da Prefeitura" 
              src="/images/logo_home.png" className="mx-auto"
            />
            <h1 className="mt-6 text-2xl font-bold text-gray-800">Acesso ao Painel</h1>
            <p className="text-sm text-gray-500">Exclusivo para servidores autorizados.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* 4. Mostra a mensagem de erro, se houver */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center gap-3">
                    <AlertCircle size={20} />
                    <span className="text-sm">{error}</span>
                </div>
            )}
            
            {/* Campos de E-mail e Senha (mantidos como estavam) */}
            <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="seu-email@inconfidentes.mg.gov.br" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"/>
            </div>
            <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"/>
            </div>
            
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg">
                <LogIn size={20} />
                Entrar
            </button>
          </form>
        </div>

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