import userProfile from '@/data/user/profile.json';
import type { UserProfile } from '@/types/user/profile';
import UserProfilePageContent from './content';

interface SoftwareSkill {
    icon: string;
    label: string;
}

export interface UserProfilePageData {
    userProfile: UserProfile;
    softwareSkills: SoftwareSkill[];
}

async function getData() {
    return { userProfile } as UserProfilePageData;
}

export default async function UsersListPage() {
    return <UserProfilePageContent {...await getData()} />;
}
