'use server';

import { createClient } from "@/lib/supabase/server";
import { uploadProfilePhoto } from "@/lib/supabase/uploadAvatar";
import { redirect } from "next/navigation";

export default async function updateProfile(formData: FormData) {
    // this functions updates profile imformation but not the avatar
    // convert to formData
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('last_name') as string;
    const email = formData.get('email') as string;
    const avatarFile = formData.get('avatar') as File | null;


    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (user.error || !user.data.user) {
        throw new Error('User not authenticated');
    }

    const userId = user.data.user.id;

    let avatarPath: string | undefined = undefined;

    if (avatarFile && avatarFile.size > 0) {
        avatarPath = await uploadProfilePhoto(avatarFile, userId);
    }

    const updates: {
        first_name: string;
        last_name: string;
        email: string;
        avatar_path?: string | null;
    } = {
        first_name: firstName,
        last_name: lastName,
        email: email,
    };
    
    if (avatarPath) {
        updates.avatar_path = avatarPath;
    }

    const { error, data: updated } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
    
    console.log(updated);


    if (error) {
        console.error('Error updating profile:', error);
        throw error;
    }

    // return a redirect to the dashboard page
    redirect('/dashboard');
}
