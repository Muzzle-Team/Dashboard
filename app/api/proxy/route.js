export async function GET(req) {
  const url = new URL(req.url).searchParams.get('url')
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  return new Response(buffer, {
    headers: { 'Content-Type': 'image/png' },
  })
}
