import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/supabase';

const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/api/auth/callback',
  '/api/auth/signin',
  '/api/auth/signup',
];

export const onRequest = defineMiddleware(async (context, next) => {
  const supabase = createSupabaseServerClient(context);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublic = PUBLIC_ROUTES.some(r => context.url.pathname.startsWith(r));

  if (!user && !isPublic) {
    return context.redirect('/login');
  }

  if (
    user &&
    (context.url.pathname === '/login' || context.url.pathname === '/register')
  ) {
    return context.redirect('/dashboard');
  }

  context.locals.user = user;
  context.locals.supabase = supabase;
  return next();
});
