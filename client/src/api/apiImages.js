import supabaseClient from '@/utils/supabase';

export async function getImagesByPropertyId(property_id, supabaseAccessToken) {
  const supabase = await supabaseClient(supabaseAccessToken);
  const { data, error } = await supabase
    .from('images')
    .select('image_url')
    .eq('property_id', property_id);
  if (error) throw error;
  return data;
}
