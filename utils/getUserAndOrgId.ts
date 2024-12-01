'use server'; 

import { createClient } from "./supabase/server";

// Utility function to get user and organization ID
export const getUserAndOrgId = async () =>
{
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if ( userError || !user )
  {
    throw new Error( 'Not authenticated' );
  }

  const { data: profile, error: profileError } = await supabase
    .from( 'user_profiles' )
    .select( 'org_id' )
    .eq( 'user_id', user.id )
    .single();

  if ( profileError || !profile )
  {
    throw new Error( 'No organization found' );
  }

  return { user, orgId: profile.org_id };
};
