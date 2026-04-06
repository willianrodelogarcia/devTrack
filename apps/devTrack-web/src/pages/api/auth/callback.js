import { createSupabaseBrowserClient } from '../../../lib/supabase';

export async function GET({ url, locals, redirect }) {
  const baseUrl = import.meta.env.PUBLIC_API_URL;
  const supabase = createSupabaseBrowserClient({
    request,
    cookies: locals.cookies,
  });
  const code = url.searchParams.get('code');

  if (code) {
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    if (data.session) {
      await fetch(`${baseUrl}/api/auth/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });
    }
  }

  return redirect('/dashboard');
}
