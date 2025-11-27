// Temporarily simplified auth for demo purposes
// Replace with full NextAuth implementation after database setup

export const handlers = {
  GET: () => new Response(JSON.stringify({ user: { id: '1', name: 'Demo User', email: 'demo@example.com' } })),
  POST: () => new Response(JSON.stringify({ user: { id: '1', name: 'Demo User', email: 'demo@example.com' } })),
}

export const auth = () => ({
  user: { id: '1', name: 'Demo User', email: 'demo@example.com' },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
})

export const signIn = () => Promise.resolve()
export const signOut = () => Promise.resolve()