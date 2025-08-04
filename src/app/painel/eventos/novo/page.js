import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import EventoForm from '../EventoForm';
const NovoEventoPage = () => (
            <>
                <HeaderPainel/>
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Criar Novo Evento</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border"><EventoForm /></div>
    </div>
            </>
);
export default NovoEventoPage;