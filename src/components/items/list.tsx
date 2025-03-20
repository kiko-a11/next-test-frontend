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
import { Items } from '@/types/items'
import Link from 'next/link'

type Props = {
  items: Array<Items>
}

export function ItemsList({ items }: Props) {
  const router = useRouter()
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
          {items.length < 1 && <TableRow><TableCell>データがありません。</TableCell></TableRow>}
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