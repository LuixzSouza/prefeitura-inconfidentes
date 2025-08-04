import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import UsuarioForm from '../UsuarioForm';
const NovoUsuarioPage = () => (
    <>
            <HeaderPainel/>
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Criar Novo Usuário</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border"><UsuarioForm /></div>
    </div>
        </>
);
export default NovoUsuarioPage;