'use cleint'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

export const TaskSchema = z.object({
  name: z.string(),
  completend: z.boolean().optional().default(false)
})


type Tas = z.infer<typeof TaskSchema>

export function useTaskItem() {

  const [is, setIs] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<Tas>({
    mode: 'all',
    resolver: zodResolver(TaskSchema)
  })

  function handleIs() {
    setIs(is => !is)
  }

  async function hanldeDeleteTask(id: string) {
    await fetch('/lib/api/tarefa', {
      method: 'DELETE',
      body: JSON.stringify(id)
    })
  }

  async function hanldeUpdateTask(data: Tas, id: string) {
    await fetch('/lib/api/tarefa', {
      method: 'PUT',
      body: JSON.stringify({ data, id })
    })
    handleIs()
  }

  return {
    handleIs,
    handleSubmit,
    register,
    hanldeDeleteTask,
    hanldeUpdateTask,
    is,
    errors
  }
}