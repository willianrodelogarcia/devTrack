export async function POST({ locals, redirect }) {
  const { data, error } = await locals.supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${import.meta.env.SITE}/api/auth/callback`,
    },
  });

  if (error) return redirect('/login?error=auth');
  return redirect(data.url);
}
