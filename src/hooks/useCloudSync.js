import { useCallback, useEffect, useState } from 'react'
import { findSyncConflicts, mergeSyncData } from '../services/syncService'
import { loadPlannerDocument, savePlannerDocument, supabase, supabaseConfigured } from '../services/supabaseService'

export function useCloudSync(tasks, sessions, onMerge) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [conflicts, setConflicts] = useState([])

  useEffect(() => {
    if (!supabase) return undefined
    let mounted = true
    supabase.auth.getUser().then(({ data }) => { if (mounted) setUser(data.user || null) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null))
    return () => { mounted = false; listener.subscription.unsubscribe() }
  }, [])

  const signIn = useCallback(async (email, password) => {
    if (!supabase) return setMessage('Add Supabase environment variables to enable cloud sync.')
    setStatus('working')
    setMessage('')
    setConflicts([])
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setStatus('error'); setMessage(error.message); return false }
    setStatus('idle')
    return true
  }, [])

  const signUp = useCallback(async (email, password) => {
    if (!supabase) return setMessage('Add Supabase environment variables to enable cloud sync.')
    setStatus('working')
    setMessage('')
    setConflicts([])
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) { setStatus('error'); setMessage(error.message); return false }
    setStatus('idle')
    setMessage(data.session ? 'Account created and signed in.' : 'Account created. Check your email to confirm it.')
    return true
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setConflicts([])
    setMessage('Signed out. Your local data is unchanged.')
  }, [])

  const syncNow = useCallback(async () => {
    if (!user) return
    setStatus('working')
    setMessage('Syncing…')
    try {
      const remote = await loadPlannerDocument(user.id)
      const resolvedConflicts = remote ? findSyncConflicts({ tasks, sessions }, remote) : []
      const merged = remote ? mergeSyncData({ tasks, sessions }, remote) : { tasks, sessions }
      await savePlannerDocument(user.id, merged.tasks, merged.sessions)
      onMerge(merged)
      setStatus('success')
      setConflicts(resolvedConflicts)
      setMessage(`Synced ${merged.tasks.length} tasks and ${merged.sessions.length} sessions${resolvedConflicts.length ? `; resolved ${resolvedConflicts.length} conflict${resolvedConflicts.length === 1 ? '' : 's'}` : ''}.`)
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Cloud sync failed.')
    }
  }, [onMerge, sessions, tasks, user])

  return { cloudConfigured: supabaseConfigured, cloudUser: user, cloudStatus: status, cloudMessage: message, cloudConflicts: conflicts, signIn, signUp, signOut, syncNow }
}
