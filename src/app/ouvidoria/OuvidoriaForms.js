"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { CheckCircle2, Loader2, Search, Send } from 'lucide-react';
import {
  manifestacaoSchema,
  consultaSchema,
  TIPOS_MANIFESTACAO,
  STATUS_SOLICITACAO,
} from '@/lib/validations/ouvidoria';

const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200";

const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="mb-1 block text-sm font-semibold text-gray-700">{label}</span>
    {children}
    {error && <span className="mt-1 block text-sm text-red-600">{error.message}</span>}
  </label>
);

const postJson = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, body };
};

export const ManifestacaoForm = () => {
  const [protocolo, setProtocolo] = useState(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(manifestacaoSchema),
  });

  const onSubmit = async (data) => {
    const { ok, body } = await postJson('/api/ouvidoria', data);
    if (!ok) {
      toast.error(body.message || 'Não foi possível registrar sua manifestação.');
      return;
    }
    setProtocolo(body.protocolo);
    reset();
  };

  if (protocolo) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 size={48} className="mx-auto mb-3 text-emerald-600" />
        <h3 className="text-xl font-bold text-gray-800">Manifestação registrada!</h3>
        <p className="mt-2 text-gray-600">Guarde seu número de protocolo para acompanhar o andamento:</p>
        <p className="my-4 font-mono text-3xl font-bold tracking-wider text-emerald-700">{protocolo}</p>
        <button onClick={() => setProtocolo(null)} className="text-sm font-semibold text-emerald-700 hover:underline">
          Registrar outra manifestação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome completo *" error={errors.nome_cidadao}>
          <input {...register('nome_cidadao')} className={inputClass} autoComplete="name" />
        </Field>
        <Field label="E-mail *" error={errors.email_cidadao}>
          <input type="email" {...register('email_cidadao')} className={inputClass} autoComplete="email" />
        </Field>
        <Field label="Telefone" error={errors.telefone_cidadao}>
          <input type="tel" {...register('telefone_cidadao')} className={inputClass} autoComplete="tel" placeholder="(35) 99999-9999" />
        </Field>
        <Field label="Tipo de manifestação *" error={errors.tipo_manifestacao}>
          <select {...register('tipo_manifestacao')} className={inputClass} defaultValue="">
            <option value="" disabled>Selecione...</option>
            {Object.entries(TIPOS_MANIFESTACAO).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Assunto *" error={errors.assunto}>
        <input {...register('assunto')} className={inputClass} />
      </Field>
      <Field label="Mensagem *" error={errors.mensagem}>
        <textarea {...register('mensagem')} rows={6} className={inputClass} />
      </Field>
      <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60">
        {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        Enviar manifestação
      </button>
    </form>
  );
};

export const ConsultaForm = () => {
  const [resultado, setResultado] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(consultaSchema),
  });

  const onSubmit = async (data) => {
    setResultado(null);
    const { ok, body } = await postJson('/api/ouvidoria/consulta', data);
    if (!ok) {
      toast.error(body.message || 'Não foi possível consultar.');
      return;
    }
    setResultado(body);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-start" noValidate>
        <Field label="Protocolo" error={errors.protocolo}>
          <input {...register('protocolo')} className={inputClass} inputMode="numeric" />
        </Field>
        <Field label="E-mail informado" error={errors.email}>
          <input type="email" {...register('email')} className={inputClass} />
        </Field>
        <button type="submit" disabled={isSubmitting} className="inline-flex h-[42px] items-center justify-center gap-2 rounded-md bg-gray-800 px-5 font-semibold text-white transition hover:bg-gray-900 disabled:opacity-60 sm:mt-6">
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          Consultar
        </button>
      </form>

      {resultado && (
        <dl className="grid gap-3 rounded-lg border bg-gray-50 p-5 text-sm sm:grid-cols-2">
          <div><dt className="font-semibold text-gray-500">Protocolo</dt><dd className="font-mono text-gray-800">{resultado.protocolo}</dd></div>
          <div><dt className="font-semibold text-gray-500">Status</dt><dd className="font-bold text-emerald-700">{STATUS_SOLICITACAO[resultado.status] ?? resultado.status}</dd></div>
          <div><dt className="font-semibold text-gray-500">Tipo</dt><dd className="text-gray-800">{TIPOS_MANIFESTACAO[resultado.tipo_manifestacao]}</dd></div>
          <div><dt className="font-semibold text-gray-500">Registrada em</dt><dd className="text-gray-800">{new Date(resultado.created_at).toLocaleDateString('pt-BR')}</dd></div>
          <div className="sm:col-span-2"><dt className="font-semibold text-gray-500">Assunto</dt><dd className="text-gray-800">{resultado.assunto}</dd></div>
          {resultado.secretaria_destino && (
            <div className="sm:col-span-2"><dt className="font-semibold text-gray-500">Encaminhada para</dt><dd className="text-gray-800">{resultado.secretaria_destino.nome}</dd></div>
          )}
        </dl>
      )}
    </div>
  );
};
