export async function POST({ locals, redirect }) {
  await locals.supabase.auth.signOut();
  return redirect('/login');
}
