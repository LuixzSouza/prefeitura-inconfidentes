import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import PaginaForm from '../PaginaForm';
const NovaPaginaPage = () => (
    <>
            <HeaderPainel/>
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Criar Nova Página</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border"><PaginaForm /></div>
    </div>
        </>
);
export default NovaPaginaPage;