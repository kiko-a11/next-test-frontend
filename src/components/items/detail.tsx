'use client'
import { Items } from '@/types/items'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import DialogDetail from '@/components/dialog'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from "@/components/ui/breadcrumb"

type Props = {
  id: string
}

export function ItemsDetail({ id }: Props) {
  const [isLoading , setIsLoading ] = useState(true)
  const router = useRouter()
  const [item, setItem] = useState<Items>({id:'', name:'', description: '', categoryId: '', categoryName: ''})
  useEffect(() => {
    fetch(`/api/v1/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data)
        setIsLoading (false)
      })
  }, [id])

  const initModalTitle = '削除してよろしいですか？'
  const [completed, setCompleted] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState(initModalTitle)
  const [done, setDone] = useState(false)

  const deleteItems = async () =>{
    try {
      setDone(true)
      const res = await fetch(`/api/v1/items/${item.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {
        setModalTitle('完了しました。')
        setCompleted(true)
      } else {
        setModalTitle('エラーが発生しました')
      }
    } catch (error) {
      console.error(error)
      alert('エラーが発生しました')
    }
  }

  const onClose= () => {
    router.push('/')
  }

  return (
    <div className="px-12 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="border-b-3 p-2 mb-4 font-semibold text-lg">
        情報詳細
      </h1>
      <div className="flex justify-end space-y-3 space-x-6 mb-4">
      <DialogDetail
        disabled={done}
        title={modalTitle}
        completed={completed}
        onSubmit={deleteItems}
        onClose={onClose}
        open={isOpen}
        setOpen={setOpen}
        triggerElement={<button type="button" disabled={done} className="cursor-pointer underline">情報を削除する</button>}
      />
      <Link href={`/items/${item.id}/edit`} className="cursor-pointer underline">情報を編集する</Link>
      </div>
      { isLoading  ? <div>データを取得しています。</div> :
        <div className="space-y-4 border rounded px-4 py-3 mx-2">
          <dl>
            <dt className="font-semibold">ID</dt>
            <dd>{item.id}</dd>
          </dl>
          <dl>
            <dt className="font-semibold">名前</dt>
            <dd>{item.name}</dd>
          </dl>
          <dl>
            <dt className="font-semibold">説明</dt>
            <dd>{item.description}</dd>
          </dl>
          <dl>
            <dt className="font-semibold">カテゴリ</dt>
            <dd>{item.categoryName}</dd>
          </dl>
        </div>
      }
    </div>
  )
}