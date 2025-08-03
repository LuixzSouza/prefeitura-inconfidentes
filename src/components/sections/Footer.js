// components/Footer.jsx
import Image from "next/image";
import { Link_Footer } from "../util/Link_Footer";
import { footerLinks } from "../data/footerLinks";

export function Footer() {
  return (
    <footer className="relative pt-32 flex flex-col rounded-t-2xl bg-gradient-to-b from-green-50 via-green-50 to-green-50 text-gray-800">
      <div className="flex items-center h-[530px]" >
        <div className="w-full flex flex-col md:flex-row justify-around gap-10">
          {/* Coluna da logo + endereço */}
          <div className="flex flex-col gap-4 ">
            <div className=" inline-block p-4 rounded-2xl shadow-lg">
              <Image
                src="https://inconfidentes.mg.gov.br/wp-content/uploads/2025/07/LOGO-2025-2.png"
                width={200}
                height={70}
                alt="Logo Prefeitura"
                className="rounded-lg"
              />
            </div>
            <div>
              <h4 className="text-green-700 font-bold text-lg">Prefeitura de Inconfidentes</h4>
              <address className="not-italic text-sm text-gray-700 leading-relaxed">
                Rua Engenheiro Álvares Maciel, nº 190<br />
                Centro, Bueno Brandão/MG<br />
                CEP: 37576-000<br />
                <a href="tel:+553534641015" className="text-green-600 hover:underline">
                  (35) 3464-1015
                </a>
              </address>
            </div>
            {/* Imagem de fundo à direita */}
            <div className=" w-full max-w-3xs relative">
              <Image
                src="/images/peregrino_desenho.png"
                width={612}
                height={800}
                alt="Igreja Matriz"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Colunas com os links */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {footerLinks.map((section, index) => (
              <Link_Footer key={index} title={section.title} items={section.items} />
            ))}
          </div>
        </div>
        
        {/* Imagem de fundo à direita */}
        <div className=" w-full max-w-md relative bottom-10">
          <Image
            src="/images/igreja-matriz-footer.png"
            width={612}
            height={800}
            alt="Igreja Matriz"
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Créditos ou direitos autorais */}
      <div className="bg-green-700 text-white text-center text-sm py-4 mt-4">
        © {new Date().getFullYear()} Prefeitura Municipal de Inconfidentes. Todos os direitos reservados.
      </div>
    </footer>
  );
}