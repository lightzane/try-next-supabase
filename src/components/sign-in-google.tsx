"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function GoogleAuthSignIn() {
  async function handleGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return <Button onClick={handleGoogle}>Sign-in with Google</Button>
}
