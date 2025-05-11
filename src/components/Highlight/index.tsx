'use client'

import { type ReactNode, useMemo } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@site/src/components/ui/popover'
import { cn } from '@site/src/util/cn'
import { Drawer } from 'vaul'

interface HighlightProps {
  trigger: ReactNode
  title?: string | ReactNode
  content: ReactNode
  width?: string
  direction?: 'bottom' | 'top' | 'left' | 'right'
}

const highlightClasses = [
  'highlight-1',
  'highlight-2',
  'highlight-3',
  'highlight-4',
  'highlight-5',
  'highlight-6',
]

export const Highlight = ({
  trigger,
  title,
  content,
  direction = 'bottom',
}: HighlightProps) => {
  const highlightClass = useMemo(() => {
    const titleString = trigger?.toString() || ''
    // Use a more deterministic hashing algorithm
    let hash = 0
    for (let i = 0; i < titleString.length; i++) {
      const char = titleString.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32bit integer
    }
    // Ensure positive index
    const index = Math.abs(hash) % highlightClasses.length
    return highlightClasses[index]
  }, [trigger])

  return (
    <>
      <span className='hidden md:inline-block'>
        <Popover>
          <PopoverTrigger
            className={cn(
              'cursor-pointer inline-block relative',
              highlightClass,
            )}
            type='button'
          >
            {trigger}
          </PopoverTrigger>
          <PopoverContent
            className='w-96 md:w-96'
            side={direction}
            align='center'
          >
            <div className='space-y-2'>
              {title &&
                (typeof title === 'string' ? (
                  <h4 className='text-lg font-bold'>{title}</h4>
                ) : (
                  title
                ))}
              {content}
            </div>
          </PopoverContent>
        </Popover>
      </span>
      <span className='md:hidden'>
        <Drawer.Root>
          <Drawer.Trigger
            className={cn(
              'cursor-pointer inline-block relative',
              highlightClass,
            )}
            type='button'
          >
            {trigger}
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className='fixed inset-0 bg-black/40' />
            <Drawer.Content className='bg-background h-fit fixed bottom-0 left-0 right-0 outline-none p-4 pb-12'>
              <div
                aria-hidden
                className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-2'
              />
              <div className='space-y-2'>
                {title &&
                  (typeof title === 'string' ? (
                    <Drawer.Title className='text-lg font-bold'>
                      {title}
                    </Drawer.Title>
                  ) : (
                    title
                  ))}
                {content}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </span>
    </>
  )
}
