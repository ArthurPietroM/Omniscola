import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { institutions } from './schemas/institutions';
import { users } from './schemas/users';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function seed() {
  console.log('Iniciando seed...');

  const institutionId = randomUUID();
  await db.insert(institutions).values({
    id:        institutionId,
    nome:      'Senac CE',
    slug:      'senac-ce',
    createdAt: new Date().toISOString(),
  });
  console.log('Institution criada:', institutionId);

  const passwordHash = await bcrypt.hash('admin123', 10);
  await db.insert(users).values({
    id:           randomUUID(),
    institutionId,
    nome:         'Administrador Senac',
    email:        'admin@senac.br',
    passwordHash,
    role:         'admin',
    ativo:        true,
    createdAt:    new Date().toISOString(),
  });
  console.log('Admin criado: admin@senac.br / admin123');

  await client.end();
  console.log('Seed concluido!');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});