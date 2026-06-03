export async function GET() {
  const baseUrl = import.meta.env.PUBLIC_API_URL;
  await fetch(`${baseUrl}/api/health`, {
    method: 'GET',
  });

  return new Response('OK');
}
