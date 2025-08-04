import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import GaleriaForm from '../GaleriaForm';
const NovaGaleriaPage = () => (
            <>
                <HeaderPainel/>
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Nova Galeria de Fotos</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border"><GaleriaForm /></div>
    </div>
            </>
);
export default NovaGaleriaPage;