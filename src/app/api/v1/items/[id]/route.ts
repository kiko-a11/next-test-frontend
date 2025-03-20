import { NextResponse } from 'next/server';
import { Items } from '@/types/items'
import { Categories } from '@/types/categories'

export async function GET(_: Request,
  { params }: { params: Promise<{ id: string }> }) {    
  // 全体
  const { id } = await params
  const res = await fetch(`${process.env.BACKEND_SERVER}/items/${id}`)
  if (!res.ok) throw new Error('Failed to fetch data')
  const data :Items = await res.json()

  // カテゴリ
  const categoryRes = await fetch(`${process.env.BACKEND_SERVER}/categories/${data.categoryId}`);
  if (!res.ok) throw new Error(`Failed to fetch category ${data.categoryId}`);
  const category :Categories = await categoryRes.json()
  data.categoryName = category.name

  return NextResponse.json(data)
}

export async function PUT(req : Request,
  { params }: { params: Promise<{ id: string }> }) {    
  const { id } = await params
  const body = await req.json()

  console.log('更新データ:', body);
  const res = await fetch(`${process.env.BACKEND_SERVER}/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to fetch data')
  return NextResponse.json({status:'OK'})
}

export async function DELETE(req : Request,
  { params }: { params: Promise<{ id: string }> }) {    
  const { id } = await params
  const res = await fetch(`${process.env.BACKEND_SERVER}/items/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Failed to fetch data')
  return NextResponse.json({status:'OK'})
}
