import { PrismaClient } from '@prisma/client';

// Esta função cria uma nova instância do PrismaClient.
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declara um tipo para o nosso objeto global.
// Em um ambiente de desenvolvimento, o 'globalThis' é preservado entre os hot reloads.
const globalForPrisma = globalThis;

// Verifica se já existe uma instância do prisma no objeto global.
// Se não existir, cria uma nova usando a função singleton.
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Exporta a instância única para ser usada em qualquer lugar do projeto.
export default prisma;

// Em ambiente de desenvolvimento, armazena a instância no objeto global.
// Isso garante que na próxima vez que o código for recarregado, a mesma instância seja reutilizada.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}