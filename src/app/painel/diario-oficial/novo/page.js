import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import DiarioOficialForm from '../DiarioOficialForm';
const NovaEdicaoPage = () => (
    <>
    <HeaderPainel/>
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Nova Edição do Diário Oficial</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border"><DiarioOficialForm /></div>
    </div>
    </>
);
export default NovaEdicaoPage;