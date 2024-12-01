"use client";

import { FormEditorComponent } from '@/components/form-editor';
import { useUser } from '@/contexts/UserContext';
import { useParams } from 'next/navigation';

export default function EditForm ()
{
  const { user, loading } = useUser();  // Ensure this hook has proper context wrapping
  const params = useParams();
  const formId = Array.isArray(params?.formId) ? params.formId[0] : params?.formId; // Ensure formId is a string

  if ( loading ) return <div>Loading...</div>;
  if ( !user ) return <div>User not authenticated</div>;
  if ( !formId ) return <div>Form ID not found in URL</div>;

  const orgId = user.organizationId;  // Ensure user object has organizationId

  return (
    <div>
      <FormEditorComponent orgId={ orgId } formId={ formId } user={user } />
    </div>
  );
}
