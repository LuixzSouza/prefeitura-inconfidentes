import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import LegislacaoForm from '../LegislacaoForm';
const NovaLegislacaoPage = () => (
            <>
                <HeaderPainel/>
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Item de Legislação</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border"><LegislacaoForm /></div>
    </div>
            </>
);
export default NovaLegislacaoPage;