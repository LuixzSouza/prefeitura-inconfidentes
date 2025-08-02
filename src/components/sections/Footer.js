// components/Footer.jsx
import Image from "next/image";
import { Link_Footer } from "../util/Link_Footer";
import { footerLinks } from "../data/footerLinks";

export function Footer() {
  return (
    <footer className="mt-32 flex flex-col bg-gray-100 text-gray-800">
        <div className="flex items-center h-[530px]" >
            <div className="w-full flex flex-col md:flex-row justify-around gap-10">
                {/* Coluna da logo + endereço */}
                <div className="flex flex-col gap-4 ">
                <Image src="/images/logo_home.png" width={325} height={113} alt="Logo Footer" className=" shadow-black/15 shadow-lg px-8 rounded-r-2xl" />
                <div>
                    <h4 className="text-green-700 font-bold">Prefeitura de Inconfidentes</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                    Rua Engenheiro Álvares Maciel, nº 190 <br />
                    Centro, Bueno Brandão/MG <br />
                    CEP: 37576-000 <br />
                    (35) 3464 – 1015
                    </p>
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
            <div className=" w-full max-w-md relative bottom-0">
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
