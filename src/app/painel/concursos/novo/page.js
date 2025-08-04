import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import ConcursoForm from '../ConcursoForm';
const NovoConcursoPage = () => (
    <>
        <HeaderPainel/>
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Concurso / Processo Seletivo</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border"><ConcursoForm /></div>
        </div>
    </>
);
export default NovoConcursoPage;