import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(supabaseUrl && supabaseKey)
export const supabase = supabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null

export async function savePlannerDocument(userId, tasks, sessions) {
  if (!supabase) throw new Error('Supabase is not configured for this deployment.')
  const { error } = await supabase.from('planner_documents').upsert({
    user_id: userId,
    tasks,
    sessions,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

export async function loadPlannerDocument(userId) {
  if (!supabase) throw new Error('Supabase is not configured for this deployment.')
  const { data, error } = await supabase.from('planner_documents').select('tasks, sessions').eq('user_id', userId).maybeSingle()
  if (error) throw error
  return data ? { tasks: Array.isArray(data.tasks) ? data.tasks : [], sessions: Array.isArray(data.sessions) ? data.sessions : [] } : null
}
