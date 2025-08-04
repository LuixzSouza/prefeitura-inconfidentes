import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import LicitacaoForm from '../LicitacaoForm';
const NovaLicitacaoPage = () => (
    <>
        <HeaderPainel/>
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Nova Licitação</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border"><LicitacaoForm /></div>
        </div>
    </>
);
export default NovaLicitacaoPage;