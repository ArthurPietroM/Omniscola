import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/core/infrastructure/database/schemas',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: { url: './database.sqlite' }
});