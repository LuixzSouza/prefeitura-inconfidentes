import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import ServidorForm from '../ServidorForm';
const NovoServidorPage = () => (
    <>
            <HeaderPainel/>
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Servidor</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border"><ServidorForm /></div>
    </div>
        </>
);
export default NovoServidorPage;