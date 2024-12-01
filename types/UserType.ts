export interface UserType
{
  id: string; // From auth.users
  email: string; // From auth.users
  name?: string; // New field for user's name
  orgName: string; // From userProfiles
  organizationId: string; // From userProfiles
  role: string; // From userProfiles or auth.users depending on your logic
  avatar: string; // From userProfiles or a default URL
  contactNumber?: string; // Optional field from userProfiles
  bio?: string; // Optional field from userProfiles
  socialLinks?: Record<string, string>; // Optional field from userProfiles
  isActive: boolean; // From userProfiles
  lastLogin?: Date; // Optional field from userProfiles
  permissions?: Record<string, boolean>; // Optional field from userProfiles
  preferences?: Record<string, unknown>; // Optional field from userProfiles
  department?: string; // Optional field from userProfiles
  createdAt: Date; // From userProfiles
  updatedAt: Date; // From userProfiles

}