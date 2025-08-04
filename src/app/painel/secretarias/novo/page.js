import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import SecretariaForm from '../SecretariaForm';
const NovaSecretariaPage = () => (
    <>
            <HeaderPainel/>
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Nova Secretaria</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border"><SecretariaForm /></div>
    </div>
        </>
);
export default NovaSecretariaPage;