import { z } from "zod";

export const TIPOS_MANIFESTACAO = {
  sugestao: "Sugestão",
  reclamacao: "Reclamação",
  elogio: "Elogio",
  denuncia: "Denúncia",
  informacao: "Pedido de Informação",
};

export const STATUS_SOLICITACAO = {
  aberto: "Aberto",
  em_analise: "Em análise",
  respondido: "Respondido",
  fechado: "Fechado",
};

export const manifestacaoSchema = z.object({
  nome_cidadao: z.string().trim().min(3, "Informe seu nome completo.").max(255),
  email_cidadao: z.string().trim().email("Informe um e-mail válido.").max(100),
  telefone_cidadao: z.string().trim().max(20).optional().or(z.literal("")),
  tipo_manifestacao: z.enum(Object.keys(TIPOS_MANIFESTACAO), { message: "Selecione o tipo." }),
  assunto: z.string().trim().min(5, "O assunto deve ter ao menos 5 caracteres.").max(255),
  mensagem: z.string().trim().min(20, "Descreva sua manifestação com ao menos 20 caracteres.").max(5000),
});

export const consultaSchema = z.object({
  protocolo: z.string().trim().min(1, "Informe o protocolo.").max(20),
  email: z.string().trim().email("Informe um e-mail válido."),
});
