import 'server-only'
import { RegisterItems } from '@/components/items/register'

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>
}) {


  let itemData, categoriesData
  try {
    const { id } = await params
    const [ items, categories] = await Promise.all([
      fetch(`${process.env.API_BASE}/api/v1/items/${id}`),
      fetch(`${process.env.API_BASE}/api/v1/categories`)
    ])
    if (!items.ok || !categories.ok) throw new Error('Failed to fetch data')
    itemData = await items.json()
    categoriesData = await categories.json()
  } catch (error) {
    console.log(error)
  }
  return (
    <RegisterItems item={itemData} categories={categoriesData} />
  )
}
