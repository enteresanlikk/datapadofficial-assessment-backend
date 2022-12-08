import { config } from 'https://deno.land/std@0.165.0/dotenv/mod.ts';
await config({ export: true, allowEmptyValues: true });

const PORT = Deno.env.get('PORT') || 3030;
const SHEET_ID = Deno.env.get('SHEET_ID');
const DATA_SHEET_NAME = Deno.env.get('DATA_SHEET_NAME');
const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');

export { PORT, SHEET_ID, DATA_SHEET_NAME, GOOGLE_API_KEY };