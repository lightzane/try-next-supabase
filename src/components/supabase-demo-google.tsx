import GoogleSignIn from "@/components/sign-in-google"
import SignOut from "@/components/sign-out"
import { createClient } from "@/lib/supabase/server"
import { GoogleUserMetadata } from "@/lib/supabase/types/google-user-metadata"

export default async function SupabaseDemoGoogle() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()

  const googleUser = data?.claims.user_metadata as GoogleUserMetadata

  return (
    <div className="mt-10">
      {googleUser ? (
        <div className="flex items-center gap-x-3">
          <img src={googleUser.avatar_url} className="size-8 rounded-full" />
          <span>{googleUser.email}</span>
          <SignOut />
        </div>
      ) : (
        <GoogleSignIn />
      )}
    </div>
  )
}
