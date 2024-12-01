'use server';

import { db } from '@/db';
import { organizations, volunteers } from '@/db/schemas/schema';
import { VolunteerType } from '@/types/VolunteerType';
import { eq } from 'drizzle-orm'; // Assuming you use drizzle-orm

export async function getVolunteersForOrg ( orgName: string ): Promise<VolunteerType[]>
{
  // Fetch volunteers for a specific organization from the database
  const volunteerList = await db
    .select( {
      id: volunteers.id,
      name: volunteers.name,
      email: volunteers.email,
      phone: volunteers.phone,
      role: volunteers.role,
      shift: volunteers.shift,
      availability: volunteers.availability,
      createdAt: volunteers.createdAt,
      updatedAt: volunteers.updatedAt,
      status: volunteers.status,
      orgId: volunteers.orgId,
      eventId: volunteers.eventId,
      notes: volunteers.notes,
      waiverSigned: volunteers.waiverSigned,
      organizationName: organizations.name, // Fetch organization name via join
    } )
    .from( volunteers )
    .innerJoin( organizations, eq( volunteers.orgId, organizations.id ) )
    .where( eq( organizations.name, orgName ) ) // Filter by organization name
    .orderBy( volunteers.createdAt );

  // Convert any necessary fields (e.g., date fields) to the correct format
  const formattedVolunteerList: VolunteerType[] = volunteerList.map( ( volunteer ) => ( {
    ...volunteer,
    createdAt: volunteer.createdAt ? new Date( volunteer.createdAt ) : null,
    updatedAt: volunteer.updatedAt ? new Date( volunteer.updatedAt ) : null,
  } ) );

  return formattedVolunteerList;
}

interface CreateVolunteerInput
{
  orgId: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  shift?: string;
  availability?: string;
  emergencyContact?: string;
  tshirtSize?: string;
}

export const createVolunteer = async ( volunteerData: CreateVolunteerInput ) =>
{
  try
  {
    const newVolunteer = await db.insert( volunteers ).values( {

      orgId: volunteerData.orgId,
      eventId: volunteerData.eventId,
      name: volunteerData.name,
      email: volunteerData.email,
      phone: volunteerData.phone || null,
      role: volunteerData.role,
      shift: volunteerData.shift || null,
      availability: volunteerData.availability || null,
      emergencyContact: volunteerData.emergencyContact || null,
      tshirtSize: volunteerData.tshirtSize || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } );
    return { success: true, volunteer: newVolunteer };
  } catch ( error )
  {
    console.error( 'Error creating volunteer:', error );
    return { success: false, error: 'Failed to create volunteer' };
  }
};

interface UpdateVolunteerInput
{
  volunteerId: string;
  name?: string;
  phone?: string;
  role?: string;
  shift?: string;
  availability?: string;
  emergencyContact?: string;
  tshirtSize?: string;
  status?: string;
}

export const updateVolunteer = async ( volunteerId: string, volunteerData: UpdateVolunteerInput ) =>
{
  try
  {
    const updatedVolunteer = await db
      .update( volunteers )
      .set( {
        name: volunteerData.name,
        phone: volunteerData.phone,
        role: volunteerData.role,
        shift: volunteerData.shift,
        availability: volunteerData.availability,
        emergencyContact: volunteerData.emergencyContact,
        tshirtSize: volunteerData.tshirtSize,
        status: volunteerData.status,
        updatedAt: new Date(),
      } )
      .where( eq( volunteers.id, volunteerId ) );
    return { success: true, volunteer: updatedVolunteer };
  } catch ( error )
  {
    console.error( 'Error updating volunteer:', error );
    return { success: false, error: 'Failed to update volunteer' };
  }
};

export const deleteVolunteer = async ( volunteerId: string ) =>
{
  try
  {
    await db
      .delete( volunteers )
      .where( eq( volunteers.id, volunteerId ) );
    return { success: true };
  } catch ( error )
  {
    console.error( 'Error deleting volunteer:', error );
    return { success: false, error: 'Failed to delete volunteer' };
  }
};