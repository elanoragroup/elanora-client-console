import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xbnqbzqiehjwevkavwbf.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_zoSv5N2Egw-u9Q2bCvm_3A_IpSdXFov'
  )
}
