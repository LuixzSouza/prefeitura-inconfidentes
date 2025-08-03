import NoticiaForm from '../NoticiaForm'; // Reutilizaremos o formulário

const NovaNoticiaPage = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Criar Nova Notícia</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border">
                <NoticiaForm />
            </div>
        </div>
    );
};

export default NovaNoticiaPage;