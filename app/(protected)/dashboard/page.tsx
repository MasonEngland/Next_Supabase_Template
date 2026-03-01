import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import signout  from './signout';
import Link from "next/link";

interface ProfileResponse {
    data: {
        id: number;
        user_id: string;
        email: string;
        first_name: string;
        last_name: string;
        updated_at: string;
        avatar_path: string | null;
    },
    error: unknown | null;
}

export default async function ProfilePage() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (user.error || !user.data.user) {
        redirect('/login');
    }

    const getAvatarUrl = async (avatarPath: string) => {
        const oneHourInSeconds = 60 * 60;
        const { data, error } = await supabase.storage
            .from('avatars')
            .createSignedUrl(avatarPath, oneHourInSeconds);

        if (error) {
            console.error(error);
            return null;
        }

        return data.signedUrl;
    };


    const profile = await supabase.from('profiles').select('*').eq('user_id', user.data.user?.id).single() as ProfileResponse;

    if (profile.error || !profile.data) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h1>Profile Not Found</h1>
                <p>We couldn&apos;t find your profile information. Please contact support.</p>
            </div>
        );
    }

    const avatarUrl = profile.data.avatar_path ? await getAvatarUrl(profile.data.avatar_path) : null;


    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Link href="/profile" style={{ textAlign: 'center', color: '#4F46E5' }}>Edit Profile</Link>
            <div style={{ marginBottom: '1.5rem' }}>
                {profile.data.avatar_path && (
                    <Image src={avatarUrl || ''} alt="Profile Avatar" width={100} height={100} style={{borderRadius: '50%', marginBottom: '1rem' }} unoptimized />
                )}
                <p><strong>First Name:</strong> {profile.data.first_name}</p>
                <p><strong>Last Name:</strong> {profile.data.last_name}</p>
                <p><strong>Email:</strong> {profile.data.email}</p>
                <p><strong>Last Updated:</strong> {new Date(profile.data.updated_at).toLocaleString()}</p>
            </div>
            <form action={signout}>
                <button
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#4F46E5',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                    type="submit"
                >
                    Logout
                </button>
            </form>
            
        </div>
    );
}