import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch(`${process.env.BACKEND_SERVER}/categories`)
  if (!res.ok) throw new Error('Failed to fetch data')
  return NextResponse.json(await res.json())
}
