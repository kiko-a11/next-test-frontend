import { NextResponse } from 'next/server'
import { Items } from '@/types/items'
import { Categories } from '@/types/categories'

export async function GET() {
  // 全体
  const res = await fetch(`${process.env.BACKEND_SERVER}/items`)
  if (!res.ok) throw new Error('Failed to fetch data')
  const data : Array<Items> = await res.json()

  // カテゴリ情報のためにそれぞれ呼び出す
  const categories: Array<Categories> = await Promise.all(
    data.map(async item => {
      const res = await fetch(`${process.env.BACKEND_SERVER}/categories/${item.categoryId}`);
      if (!res.ok) throw new Error(`Failed to fetch category ${item.categoryId}`);
      return res.json();
    })
  )

  data.forEach((category, i) => {
    category.categoryName = categories[i].name    
  })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  console.log('受信データ:', body)
  const res = await fetch(`${process.env.BACKEND_SERVER}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to fetch data')
  return NextResponse.json({status:'OK'})
}
