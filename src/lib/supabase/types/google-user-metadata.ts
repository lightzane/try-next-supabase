export interface GoogleUserMetadata {
  iss: string
  sub: string
  name: string
  email: string
  email_verified: boolean
  picture: string // avatar URL
  full_name: string
  avatar_url: string // Supabase normalizes this from `picture`
  provider_id: string
}
