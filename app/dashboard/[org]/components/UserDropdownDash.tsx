import { useEffect, useState } from 'react';
import { Avatar, Dropdown } from 'flowbite-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

export default function UserDropdown() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser();
            setUser(user); // TypeScript now knows user can be either User or null
        };

        fetchUser();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login'); // Redirect after sign out
    };

    return (
        <Dropdown
            className="rounded"
            arrowIcon={false}
            inline
            label={
                <span>
                    <span className="sr-only">User menu</span>
                    <Avatar
                        alt=""
                        img={'/images/avatars/user-avatar.jpg'}
                        rounded
                        size="sm"
                        className="h-8 w-8 md:h-10 md:w-10"
                    />
                </span>
            }
        >
            <Dropdown.Header className="px-4 py-3">
                <span className="block truncate text-sm font-medium">
                    {user?.email || 'Loading...'}
                </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
        </Dropdown>
    );
}
