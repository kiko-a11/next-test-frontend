import 'server-only'
import { RegisterItems } from '@/components/items/register'

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <RegisterItems id={id} />
  )
}
