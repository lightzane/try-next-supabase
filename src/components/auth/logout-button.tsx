"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    // Option A: Without Re-route
    // re-fetches the current route's Server Components
    // without a full reload or losing client state elsewhere
    // so pages/components re-runs getClaims(), sees no session
    // router.refresh()

    // Option B: With Re-route
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
