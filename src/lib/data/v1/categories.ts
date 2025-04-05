export async function selectAll() {
  const res = await fetch(`${process.env.BACKEND_SERVER}/categories`, { cache: 'no-store'})
  if (!res.ok) throw new Error('Failed to fetch data')
  return await res.json()
}
