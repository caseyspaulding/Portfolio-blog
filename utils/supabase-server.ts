import { Database } from '@/database.types';
import { createServerClient } from '@supabase/ssr'

import { cookies } from 'next/headers'

export default async function useSupabaseServer ()
{
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll ()
        {
          return cookieStore.getAll().map( ( cookie ) => ( {
            name: cookie.name,
            value: cookie.value,
          } ) );
        },
        setAll ( cookies )
        {
          cookies.forEach( ( cookie ) =>
          {
            document.cookie = `${ cookie.name }=${ cookie.value }`;
          } );
        },
      },
    }
  );
}