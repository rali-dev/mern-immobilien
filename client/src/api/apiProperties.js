import supabaseClient from "@/utils/supabase"

export async function getProperties(token, {location, company_id, searchQuery }) {
    const supabase = await supabaseClient(token);

    let query = supabase
      .from('properties')
      .select('*, company:companies(name, logo_url), saved: saved_properties(id)');

    if (location) {
        query = query.eq('location', location);
    }
    if (company_id) {
        query = query.eq('company_id', company_id);
    }
    if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if(error) {
        console.error('Error fetching properties:', error);
        return null;
    }
    return data;
}

export async function saveProperty(token, { alreadySaved}, saveData) {
    const supabase = await supabaseClient(token);

    if(alreadySaved){
     const { data, error:deleteError } = await supabase
      .from('saved_properties')
      .delete()
      .eq("property_id", saveData.property_id);

     if(deleteError) {
      console.error('Error deleting saved property:', deleteError);
      return null;
     }
     return data;

    } else {
        const { data, error:insertError} = await supabase  
          .from("saved_properties")
          .insert([saveData])
          .select();

        if(insertError){
          console.error('Error fetching properties:', insertError);
          return null;
        }  
    }

    return data;
}

export async function getSingleProperty(token, {property_id}) {
    const supabase = await supabaseClient(token);

      const { data, error } = await supabase
       .from("properties")
       .select(
         "*, company:companies(name, logo_url)"
       )
       .eq("id", property_id)
       .single();

     if(error) {
      console.error('Error Fetching Property:', error);
      return null;
     }

     return data;
  }

  export async function updatePropertyStatus(token, {property_id}, isOpen) {
    const supabase = await supabaseClient(token);

     const { data, error } = await supabase
       .from("properties")
       .update({isOpen})
       .eq("id", property_id)
       .select();

     if(error) {
      console.error('Error Updating Property:', error);
      return null;
     }

     return data;
  }

   export async function addNewProperty(token, _ , propertyData) {
    const supabase = await supabaseClient(token);

     const { data, error } = await supabase
       .from("properties")
       .insert([propertyData])
       .select();

     if(error) {
      console.error('Error Creating Property:', error);
      return null;
     }

     return data;
  }

   export async function getSavedProperties(token) {
    const supabase = await supabaseClient(token);

     const { data, error } = await supabase
       .from("saved_properties")
       .select("*,property:properties(*, company:companies(name, logo_url))");

     if(error) {
      console.error('Error Fetching Saved Properties:', error);
      return null;
     }

     return data;
  }

     export async function getCreatedProperties(token, {owner_id}) {
    const supabase = await supabaseClient(token);

     const { data, error } = await supabase
       .from("properties")
       .select("*, company:companies(name, logo_url)")
       .eq("owner_id", owner_id);
     if(error) {
      console.error('Error Fetching Properties:', error);
      return null;
     }

     return data;
  }