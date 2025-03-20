import 'server-only'
import { ItemsDetail } from '@/components/items/detail'

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  let data  
  try {
    const { id } = await params
    const res = await fetch(`${process.env.API_BASE}/api/v1/items/${id}`)
    if (!res.ok) throw new Error('Failed to fetch data')
    data = await res.json()
  } catch (error) {
    console.log(error)
  }

  return (
    <ItemsDetail item={data} />
  )
}
