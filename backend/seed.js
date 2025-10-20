// backend/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Admin demo (idempotente; si ya existe, no duplica)
  await prisma.admin.upsert({
    where: { email: 'admin@pawtitas.com' },
    update: {},
    create: {
      email: 'admin@pawtitas.com',
      password: '123456', // (en prod, debería ir hasheado)
      name: 'Admin',
    },
  });

  console.log('Seed listo ✅  (admin@pawtitas.com / 123456)');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
