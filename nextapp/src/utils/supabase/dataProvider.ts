import { secret } from '@aws-amplify/backend';
import { createClient } from '@supabase/supabase-js';
import { defineFunction } from '@aws-amplify/backend';

const supabaseUrl = secret('SUPABASE_URL');
const supabaseKey = secret('SUPABASE_KEY');

export const myFunction = defineFunction({
  environment: {
    SUPABASE_URL: supabaseUrl,
    SUPABASE_KEY: supabaseKey,
  },
});

export async function getSupabaseClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_KEY!;
  return createClient(url, key);
}