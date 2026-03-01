'use server';
import { createClient } from './server';

export async function uploadProfilePhoto(file: File, userId: string) {
    const supabase = await createClient();

    const filePath = `${userId}/avatar-${Date.now()}.png`;

    const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
            metadata: { user_id: userId },
            upsert: true,
        });

    if (error) {
        console.log('Error uploading avatar:', error);
    };

    // Update the declarative schema table
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_path: filePath })
        .eq('user_id', userId);

    if (updateError) {
        console.log('Error updating profile with avatar path:', updateError);
    }
    

    return filePath;
}