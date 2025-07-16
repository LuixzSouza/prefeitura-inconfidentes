import Image from "next/image";

export function NavBarBotHome() {
    return (
        <div className="absolute bottom-0 flex items-center justify-between w-full px-4 py-2 bg-gradient-to-t from-green-800 to-transparent z-10">
        {/* Logo */}
        <Image width={240} height={80} alt="logo Inconfidentes" src="/images/logo_home.png" />

        {/* Campo de busca com label flutuante */}
        <div className="relative flex items-center w-full max-w-96">
            <div className="relative w-full">
                <input
                    type="text"
                    id="search"
                    className="peer w-full py-2 px-4 border-2 border-green-900 rounded-full bg-white text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-700"
                    placeholder="Digite sua busca"
                />
                <label
                    htmlFor="search"
                    className="absolute left-4 top-0 text-black text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-green-900 peer-focus:bg-white peer-focus:p-1 peer-focus:rounded-t-lg peer-focus:border-t-2 peer-focus:border-green-900"
                >
                    Digite sua busca
                </label>
            </div>
            <Image width={24} height={24} alt="Ícone de pesquisa" src="/icons/search.svg" className="absolute right-4" />
        </div>

        {/* Ação complementar */}
        <div className="w-full max-w-60 flex items-end justify-end" >
            <button className="ml-4 px-4 py-2 text-white bg-green-900 hover:bg-green-700 rounded-full text-sm transition">
                Acessar Guia
            </button>
        </div>
        </div>
    );
}
