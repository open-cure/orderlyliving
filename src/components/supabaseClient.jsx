import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zxeqigthdvgawwylzpct.supabase.co';
const supabaseAnonKey = 'sb_publishable_EOSrD0Zr7HrRuBHgji6Keg_Je7WY0sC';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);