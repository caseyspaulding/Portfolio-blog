export interface VolunteerType
{
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  shift?: string | null;
  availability?: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  status: string | null;
  orgId: string;
  eventId: string;
  notes?: string | null;
  waiverSigned: boolean | null;
  organizationName: string;
}