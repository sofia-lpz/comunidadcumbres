import { secret } from '@aws-amplify/backend';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = secret('SUPABASE_URL');
const supabaseKey = secret('SUPABASE_KEY');

export const supabase = createClient(supabaseUrl, supabaseKey);