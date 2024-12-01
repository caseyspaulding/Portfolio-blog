import { Database } from '@/database.types'
import type { SupabaseClient } from '@supabase/supabase-js'


export type TypedSupabaseClient = SupabaseClient<Database>