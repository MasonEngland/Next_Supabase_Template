import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import updateProfile from "./update_profile";

interface ProfileResponse {
    data: {
        id: number;
        user_id: string;
        email: string;
        first_name: string;
        last_name: string;
        updated_at: string;
        avatar_url: string | null;
    },
    error: unknown | null;
}

export default async function UpdateProfilePage() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (user.error || !user.data.user) {
        redirect('/login');
    }

    const profile = await supabase.from('profiles').select('*').eq('user_id', user.data.user?.id).single() as ProfileResponse;

    if (profile.error || !profile.data) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h1>Profile Not Found</h1>
                <p>We couldn&apos;t find your profile information. Please contact support.</p>
            </div>
        );
    }

    return (
        <form
            action={updateProfile}
            style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
            <h1 style={{ textAlign: 'center', color: '#4F46E5' }}>Update Profile</h1>
            <div style={{ marginBottom: '1.5rem' }}>
                <label>
                    <strong>First Name:</strong>
                    <input
                        type="text"
                        name="first_name"
                        defaultValue={profile.data.first_name}
                        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                    />
                </label>
                <label>
                    <strong>Last Name:</strong>
                    <input
                        type="text"
                        name="last_name"
                        defaultValue={profile.data.last_name}
                        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                    />
                </label>
                <label>
                    <strong>Email:</strong>
                    <input
                        type="email"
                        name="email"
                        defaultValue={profile.data.email}
                        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                    />
                </label>
                <label>
                    <strong>Avatar:</strong>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                    />
                </label>
            </div>
            <button
                type="submit"
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
            >
                Update Profile
            </button>
        </form>
    );
}