import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nktdpsurdshvvmyoqznk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_yKyXF_GXd9zTD3P8b6sIFQ_baUZiOBL'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations that require elevated permissions
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_dpUvDE3jNceLyus29DeQXg_S0cWYvSs',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
