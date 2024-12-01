// image-upload.ts
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const uploadFn = async ( file: File ): Promise<string | null> =>
{
  const fileName = `${ Date.now() }-${ file.name }`;

  const { data, error } = await supabase.storage
    .from( 'blogimages' )
    .upload( `public/${ fileName }`, file, {
      cacheControl: '3600',
      upsert: false,
    } );

  if ( error )
  {
    console.error( 'Error uploading file:', error.message );
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from( 'blogimages' )
    .getPublicUrl( `public/${ fileName }` );

  return publicUrl || null;
};
