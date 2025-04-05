import 'server-only'
import { RegisterItems } from '@/components/items/register'
import { selectAll } from '@/lib/data/v1/categories'
export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await selectAll()
  return (
    <RegisterItems categories={data} id={id} />
  )
}
