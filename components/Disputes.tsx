'use client';

import { formatCurrency } from '@/utils/formatCurrentcy';
import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext'; // Assuming you're using a user context

export default function DisputesComponent ()
{
  const [ disputes, setDisputes ] = useState( [] );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState<string | null>( null );
  const { user } = useUser(); // Get the user context to fetch the orgId

  useEffect( () =>
  {
    async function fetchDisputes ()
    {
      if ( !user?.organizationId ) return; // Ensure orgId is available

      try
      {
        setLoading( true );
        const res = await fetch( '/api/stripe/disputes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( { orgId: user.organizationId } ), // Pass orgId in the request body
        } );

        if ( !res.ok )
        {
          throw new Error( `Failed to fetch disputes: ${ res.statusText }` );
        }

        const data = await res.json();
        setDisputes( data );
      } catch ( err: any )
      {
        setError( err.message );
      } finally
      {
        setLoading( false );
      }
    }

    fetchDisputes();
  }, [ user?.organizationId ] ); // Fetch disputes when orgId is available

  if ( loading ) return <p>Loading disputes...</p>;
  if ( error ) return <p>Error: { error }</p>;

  return (
    <div className="disputes-container">
      <h1 className="text-3xl font-semibold mb-4">Disputes</h1>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-light md:border-none block md:table-row">
            <th className="text-left p-2">Disputed On</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Reason</th>
            <th className="text-left p-2">Amount</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          { disputes.map( ( dispute: any ) => (
            <tr key={ dispute.id } className="block md:table-row border border-grey-light md:border-none">
              <td className="p-2">{ new Date( dispute.created * 1000 ).toLocaleDateString() }</td>
              <td className="p-2">{ dispute.status }</td>
              <td className="p-2">{ dispute.reason }</td>
              <td className="p-2">{ formatCurrency( dispute.amount / 100, dispute.currency ) }</td>
            </tr>
          ) ) }
        </tbody>
      </table>
    </div>
  );
}
