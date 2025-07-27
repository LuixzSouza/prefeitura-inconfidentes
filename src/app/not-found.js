'use client'
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fefaf5] flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-start gap-10">
        {/* Número grande 404 */}
        <div className="text-green-800 text-[100px] font-bold leading-none">404</div>

        {/* Conteúdo à direita */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 uppercase">
            Página não encontrada!
          </h1>

          <p className="text-gray-800 mb-6 leading-relaxed">
            Lamentamos, mas não conseguimos encontrar a página que estava a procurar.
            Provavelmente é alguma coisa que fizemos de errado, mas agora sabemos e vamos tentar consertar.
            Enquanto isso, tente uma destas opções:
          </p>

          <ul className="list-disc list-inside mb-8 space-y-2 text-green-700 font-medium">
            <li>
              <button
                onClick={() => window.history.back()}
                className="hover:underline"
              >
                Ir para a Página Anterior
              </button>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Ir para Homepage
              </Link>
            </li>
          </ul>

          {/* Campo de pesquisa fictício (não funcional) */}
          <div className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Pesquisar ..."
              className="w-full px-4 py-2 border border-blue-800 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-800 text-white px-4 py-2 rounded-r-md hover:bg-blue-900 transition">
              PESQUISAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
