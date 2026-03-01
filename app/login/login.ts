'use server';

import { createClient } from '@/lib/supabase/server';


export default async function login(email: string, password: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Error logging in:', error);
        return null;
    }

    return data;

}