import React from 'react';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// Ícones para cada tipo de serviço
import { 
  Shield, 
  Siren, 
  HeartPulse, 
  Hospital, 
  Stethoscope,
  Building,
  Wrench,
  School,
  Users,
  Lightbulb,
  Droplets,
  Phone
} from 'lucide-react';

// --- DADOS DOS TELEFONES ---
// Para adicionar/editar, apenas modifique os arrays abaixo.

const telefonesEmergencia = [
  { id: 1, nome: 'Polícia Militar', numero: '190', icon: <Siren /> },
  { id: 2, nome: 'SAMU / Ambulância', numero: '192', icon: <HeartPulse /> },
  { id: 3, nome: 'Guarda Municipal', numero: '(35) 0000-0000', icon: <Shield /> },
  { id: 4, nome: 'Defesa Civil', numero: '199', icon: <Users /> },
];

const telefonesSaude = [
  { id: 1, nome: 'Hospital / Pronto Atendimento', numero: '(35) 0000-0000', icon: <Hospital /> },
  { id: 2, nome: 'Posto de Saúde Central', numero: '(35) 0000-0000', icon: <Stethoscope /> },
  { id: 3, nome: 'Vigilância Sanitária', numero: '(35) 0000-0000', icon: <Stethoscope /> },
];

const telefonesServicos = [
  { id: 1, nome: 'Prefeitura Municipal', endereco: 'Praça Tiradentes, 123', numero: '(35) 0000-0000', icon: <Building /> },
  { id: 2, nome: 'Secretaria de Obras', endereco: 'Rua das Flores, 45', numero: '(35) 0000-0000', icon: <Wrench /> },
  { id: 3, nome: 'Secretaria de Educação', endereco: 'Av. dos Estudos, 67', numero: '(35) 0000-0000', icon: <School /> },
  { id: 4, nome: 'Conselho Tutelar', numero: '(35) 0000-0000', icon: <Users /> },
];

const telefonesOutros = [
    { id: 1, nome: 'CEMIG (Energia)', numero: '116', icon: <Lightbulb /> },
    { id: 2, nome: 'COPASA (Água e Esgoto)', numero: '115', icon: <Droplets /> },
]

// --- COMPONENTE DA PÁGINA ---

const TelefonesUteisPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Título Principal */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Acesso Rápido</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Telefones Úteis
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Encontre aqui os contatos dos principais serviços públicos e de emergência de Inconfidentes.
          </p>
        </div>
        
        <div className="space-y-12">
          <ContactSection title="Emergência e Segurança" contacts={telefonesEmergencia} />
          <ContactSection title="Saúde" contacts={telefonesSaude} />
          <ContactSection title="Serviços Municipais" contacts={telefonesServicos} />
          <ContactSection title="Outros Serviços Essenciais" contacts={telefonesOutros} />
        </div>

      </main>
      <Footer />
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const ContactSection = ({ title, contacts }) => (
  <section>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-4 border-emerald-500 pb-2 mb-6">
      {title}
    </h2>
    <div className="space-y-4">
      {contacts.map(contact => (
        <ContactItem key={contact.id} {...contact} />
      ))}
    </div>
  </section>
);

const ContactItem = ({ icon, nome, endereco, numero }) => {
  // Remove caracteres não numéricos para o link 'tel:'
  const numeroLimpo = numero.replace(/\D/g, '');

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between gap-4 transition-shadow hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-emerald-600 bg-emerald-100 p-3 rounded-full">
            {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">{nome}</h3>
          {endereco && <p className="text-sm text-gray-500">{endereco}</p>}
        </div>
      </div>
      <a 
        href={`tel:${numeroLimpo}`}
        className="flex items-center gap-2 bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-emerald-600 transition-colors shrink-0"
      >
        <Phone size={16} />
        <span className="hidden md:inline">{numero}</span>
      </a>
    </div>
  );
};

export default TelefonesUteisPage;