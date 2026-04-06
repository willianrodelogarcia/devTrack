export async function POST({ request, locals, redirect }) {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');

  const { error } = await locals.supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return redirect('/dashboard');
}
