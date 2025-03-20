'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Items } from '@/types/items'

export function ItemsList() {
  const router = useRouter()
  const [items, setItems] = useState<Array<Items>>([])
  const [isLoading , setIsLoading ] = useState(true)

  useEffect(() => {
    fetch('/api/v1/items/')
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="px-12 py-4">
      <h1 className="border-b-3 p-2 mb-4 font-semibold text-lg">
        情報一覧
      </h1>
      <div className="flex justify-end">
        <Link href="/items/register" className="cursor-pointer underline">情報を新規登録する</Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名前</TableHead>
            <TableHead>説明</TableHead>
            <TableHead>カテゴリ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        { isLoading  && <TableRow><TableCell>データを取得しています。</TableCell></TableRow>}
        { !isLoading  && items.length < 1 && <TableRow><TableCell>データがありません。</TableCell></TableRow> }
          {items.map((item, i) => (
            <TableRow
              key={i}
              onClick={() => router.push(`items/${item.id}`)}
              className="cursor-pointer"
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.categoryName}</TableCell>
            </TableRow>
          ))}
          </TableBody>
      </Table>
    </div>
  )
}