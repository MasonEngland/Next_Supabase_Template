'use server';

import {createClient} from '@/lib/supabase/server';

export default async function signup(email: string, password: string, first_name: string, last_name: string) {
    const supabase = await createClient();

    console.log('Attempting to sign up user:', { email, first_name, last_name });

    const result = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name,
                last_name,
            }
        }
    });

    console.log('Signup result:', result);
    return result;
}