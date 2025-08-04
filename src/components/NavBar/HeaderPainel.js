"use client"; // 1. Precisa ser um componente de cliente para usar hooks

import { useSession, signOut } from 'next-auth/react'; // 2. Importe useSession e signOut
import { LayoutDashboard, LogOut } from "lucide-react";
import Breadcrumbs from '../ui/Breadcrumbs';
// Removido Breadcrumbs daqui, pois o painel principal não deve ter o mesmo que o site público

export function HeaderPainel() {
    const { data: session } = useSession(); // 3. Use o hook para buscar a sessão

    return(
        <>
            <header className="bg-white shadow-sm sticky top-0 z-20">
                <div className="flex justify-between items-center py-3 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="text-emerald-600" />
                        <h1 className="text-xl font-bold text-gray-800">Painel Administrativo</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 hidden sm:block">
                            {/* Agora a variável 'session' existe e o código funciona */}
                            Bem-vindo, <strong>{session?.user?.name || 'Usuário'}</strong>
                        </span>
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="p-2 rounded-full hover:bg-gray-200" title="Sair do Painel">
                            <LogOut size={20} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </header>
            <Breadcrumbs/>
        </>
    )
}