'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
  import { Button } from '@/components/ui/button';
  type Props = {
    triggerText?: string,
    title: string,
    disabled: boolean,
    completed: boolean,
    onSubmit: () => void,
    onClose: () => void,
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerElement?: React.ReactNode
  };


  export default function DialogDetail ({ triggerText, title, disabled, completed, onSubmit, onClose, open, setOpen, triggerElement }: Props) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger  asChild>
          {triggerElement || <Button type="button" disabled={disabled}>{triggerText || '開く'}</Button>}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center mb-5">{title}</DialogTitle>
            <DialogDescription className="flex justify-center gap-x-10">
              {completed ? 
                (<DialogClose asChild>
                  <Button type="button" onClick={onClose}>閉じる</Button>
                </DialogClose>):
                (
                  <>
                    <Button type="submit" disabled={disabled} onClick={onSubmit}>はい</Button>
                      <DialogClose asChild>
                        <Button type="button" disabled={disabled}>いいえ</Button>
                      </DialogClose>
                  </>
                )
              }
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }