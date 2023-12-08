'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const TaskSchema = z.object({
  name: z.string().min(3, { message: 'nome pequeno' })
})

type Task = z.infer<typeof TaskSchema>


export function CreateTask() {


  const {
    handleSubmit,
    reset,
    formState: { errors },
    register
  } = useForm<Task>({
    mode: 'all',
    resolver: zodResolver(TaskSchema)
  })

  async function handleTask(data: Task) {
    await fetch('lib/api/tarefa', {
      method: 'POST',
      body: JSON.stringify(data.name)
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleTask)}
      className='mt-10'
    >
      <h2>crie suas tarefas</h2>

      <input
        type="text"
        {...register('name')}
      />

      <button type="submit">criar tarefa</button>
    </form>
  )
}