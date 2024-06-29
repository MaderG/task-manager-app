import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Listar todas as tabelas do banco de dados
  const tablenames = await prisma.$queryRaw`
    SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
  `;

  // Desativar restrições de chaves estrangeiras temporariamente
  await prisma.$executeRaw`PRAGMA foreign_keys = OFF;`;

  // Deletar dados de todas as tabelas
  for (const { name } of tablenames) {
    if (name !== "_Migration") {
      // Evitar deletar a tabela de migração do Prisma
      try {
        await prisma.$executeRawUnsafe(`DELETE FROM "${name}";`);
      } catch (error) {
        console.error(`Erro ao deletar dados da tabela ${name}:`, error);
      }
    }
  }

  // Reativar restrições de chaves estrangeiras
  await prisma.$executeRaw`PRAGMA foreign_keys = ON;`;

  console.log("Banco de dados limpo com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
