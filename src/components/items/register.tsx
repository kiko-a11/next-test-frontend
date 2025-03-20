'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import DialogDetail from '@/components/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

import { Categories } from '@/types/categories'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { Items } from '@/types/items'

const formSchema = z.object({
  name: z.string().min(1).max(1000),
  description: z.string().min(1).max(1000),
  categoryId: z.string()
})

type Props = {
  item?: Items,
  categories: Array<Categories>
}

export function RegisterItems({ item = { id: '', name: '', description: '', categoryId: '', categoryName: '' }, categories }: Props) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: item,
    mode: 'onChange'
  })
  
  const initModalTitle = '送信してよろしいですか？'
  const [completed, setCompleted] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState(initModalTitle)
  const [isError, setError] = useState(false)
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch('/api/v1/items' + (item.id ? `/${item.id}` : ''), {
        method: item.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        setModalTitle('完了しました。')
        setCompleted(true)
      } else {
        setModalTitle('エラーが発生しました')
        setCompleted(true)
        setError(true)
      }
    } catch (error) {
      console.error(error)
      setModalTitle('エラーが発生しました')
      setCompleted(true)
      setError(true)
  }
  }

  const onClose= () => {
    if(isError){
      setOpen(false)
    } else {
      if (item.id) {
        router.push(`/items/${item.id}`)
      } else {
        router.push('/')
      }
    }
  }

  return (
    <div className="px-12 py-4">
      <h1 className="border-b-3 p-2 mb-4 font-semibold text-lg">
        { item.id ? '情報編集' : '新規登録' }
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>説明</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>カテゴリ</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="カテゴリ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category, i) => (
                      <SelectItem value={category.categoryId.toString()} key={i}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogDetail
            triggerText="送信"
            disabled={form.formState.isSubmitting||!form.formState.isValid||isError}
            title={modalTitle}
            completed={completed}
            onSubmit={form.handleSubmit(onSubmit)}
            onClose={onClose}
            open={isOpen}
            setOpen={setOpen}
          />
        </form>
      </Form>
    </div>
  )
}
