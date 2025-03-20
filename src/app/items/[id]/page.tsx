import 'server-only'
import { ItemsDetail } from '@/components/items/detail'

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <ItemsDetail id={id} />
  )
}
