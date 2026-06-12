import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan las variables de entorno de Supabase en el Cliente.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export function getOptimizedImageUrl(url, width = 800, quality = 80) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('/storage/v1/object/public/')) {
    const newUrl = url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
    return `${newUrl}?width=${width}&quality=${quality}`;
  }
  return url;
}