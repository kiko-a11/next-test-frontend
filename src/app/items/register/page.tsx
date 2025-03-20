import 'server-only'
import { RegisterItems } from '@/components/items/register'

export default async function Home() {

  let data  
  try {
    const res = await fetch(`${process.env.API_BASE}/api/v1/categories`)
    if (!res.ok) throw new Error('Failed to fetch data')
    data = await res.json()
  } catch (error) {
    console.log(error)
  }
  return (
    <RegisterItems categories={data} />
  )
}
