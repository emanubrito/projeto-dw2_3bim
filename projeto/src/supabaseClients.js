import { createClient } from "@supabase/supabase-js";

// Substitua pelos dados do seu projeto
const SUPABASE_URL = "https://SEU_SUPABASE_URL.supabase.co";
const SUPABASE_KEY = "SUA_CHAVE_ANONIMA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
