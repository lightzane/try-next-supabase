"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SignOut() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()

    // re-fetches the current route's Server Components
    // without a full reload or losing client state elsewhere
    // so SupabaseDemoGoogle re-runs getClaims(), sees no session
    router.refresh()
  }

  return (
    <Button variant="secondary" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
