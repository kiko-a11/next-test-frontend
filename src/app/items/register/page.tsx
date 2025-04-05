import 'server-only'
import { RegisterItems } from '@/components/items/register'
import { selectAll } from '@/lib/data/v1/categories'

export default async function Home() {
  const data = await selectAll()

  return (
    <RegisterItems categories={data}/>
  )
}
