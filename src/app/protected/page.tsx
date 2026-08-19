import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { createClient } from "@/lib/supabase/server";
import type { GoogleUserMetadata } from "@/lib/supabase/types/google-user-metadata";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const avatar = (data.claims.user_metadata as GoogleUserMetadata).avatar_url;

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        {avatar && <img src={avatar} className="mr-3 inline-block size-8 rounded-full" />}
        Hello <span>{data.claims.email}</span>
      </p>
      <LogoutButton />
    </div>
  );
}
