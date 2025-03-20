import { Items } from '@/types/items'
import { Categories } from '@/types/categories'

export async function selectOne(id: string) {    
  // 全体
  const res = await fetch(`${process.env.BACKEND_SERVER}/items/${id}`)
  if (!res.ok) throw new Error('Failed to fetch data')
  const data :Items = await res.json()

  // カテゴリ
  const categoryRes = await fetch(`${process.env.BACKEND_SERVER}/categories/${data.categoryId}`);
  if (!res.ok) throw new Error(`Failed to fetch category ${data.categoryId}`);
  const category :Categories = await categoryRes.json()
  data.categoryName = category.name

  return data
}

export async function selectAll() {
  // 全体
  const res = await fetch(`${process.env.BACKEND_SERVER}/items`, {
    next: { revalidate: 1 }, // 30秒ごとにデータを更新
  })
  if (!res.ok) throw new Error('Failed to fetch data')
  const data : Array<Items> = await res.json()
  console.log(res.ok)

  // カテゴリ情報のためにそれぞれ呼び出す
  const categories: Array<Categories> = await Promise.all(
    data.map(async item => {
      const categoryRes = await fetch(`${process.env.BACKEND_SERVER}/categories/${item.categoryId}`);
      if (!categoryRes.ok) throw new Error(`Failed to fetch category ${item.categoryId}`);
      return categoryRes.json();
    })
  )

  data.forEach((category, i) => {
    category.categoryName = categories[i].name    
  })
  console.log(data)
  return data
}
