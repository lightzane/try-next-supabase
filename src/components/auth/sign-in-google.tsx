"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface Props {
  className?: string;
  disabled?: boolean;
}

export default function GoogleAuthSignIn({ className, disabled }: Props) {
  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/protected`,
      },
    });
  }

  return (
    <Button
      variant="secondary"
      type="button"
      className={className}
      onClick={handleGoogle}
      disabled={disabled}
    >
      Login with Google
    </Button>
  );
}
