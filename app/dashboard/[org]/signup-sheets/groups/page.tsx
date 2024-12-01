'use client';

import SignupSheetGroups from "@/components/signupGroups";
import { useUser } from "@/contexts/UserContext";

export default function GroupsPage ()
{
  const { user, loading } = useUser();  // Ensure this hook has proper context wrapping

  if ( loading ) return <div>Loading...</div>;
  if ( !user ) return <div>User not authenticated</div>;

  const orgId = user.organizationId;  // Ensure user object has organizationId
  const userId = user.id;  // Ensure user object has id
  return (
    <div>
      <SignupSheetGroups orgId={ orgId } />
    </div>
  )
}