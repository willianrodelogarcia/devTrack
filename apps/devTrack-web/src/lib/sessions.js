export async function getServerSession(astroContext) {
  const supabase = astroContext.locals.supabase;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
