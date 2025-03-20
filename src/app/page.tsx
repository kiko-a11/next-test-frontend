import 'server-only'
import { Items } from '@/types/items'
import { ItemsList } from '@/components/items/list'

export default async function Home() {

  let data: Array<Items> = []
  
  try {
    const res = await fetch(`${process.env.API_BASE}/api/v1/items/`)
    if (!res.ok) throw new Error('Failed to fetch data')
    data = await res.json()
  } catch (error) {
    console.log(error)
  }

  return (
    <ItemsList items={data} />
  )
}
