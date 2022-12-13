import { dotenv } from './deps.ts';
await dotenv.config({ export: true, allowEmptyValues: true });

export const PORT = Deno.env.get('PORT') || 3030;
export const SHEET_ID = Deno.env.get('SHEET_ID');
export const DATA_SHEET_NAME = Deno.env.get('DATA_SHEET_NAME');
export const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');