import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (user.error || !user.data.user) {
        redirect('/login');
    }

    return (
        <div>
            {children}
        </div>
    );
}