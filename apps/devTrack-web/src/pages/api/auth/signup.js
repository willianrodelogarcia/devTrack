export async function POST({ request, locals, cookies, redirect }) {
  const form = await request.formData();
  const email = form.get('email');
  const name = form.get('name');
  const password = form.get('password');

  const { error, data } = await locals.supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  await fetch(`${import.meta.env.PUBLIC_API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: data.user.id,
      email,
      name,
    }),
  });

  return redirect('/login?message=Revisa tu email para confirmar tu cuenta');
}
