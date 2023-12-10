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
    mode: 'onSubmit',
    resolver: zodResolver(TaskSchema)
  })

  async function handleTask(data: Task) {
    await fetch('lib/api/tarefa', {
      method: 'POST',
      body: JSON.stringify(data.name)
    })
    reset()
  }

  return (

    <form
      onSubmit={handleSubmit(handleTask)}
      className='text-black flex w-full gap-5 justify-center'
    >
      <label htmlFor="">

        <input
          type="text"
          placeholder='crie sua tarefa'
          className='pl-2 p-1 rounded-lg outline-none'
          {...register('name')}
        />
        <p className='text-xs text-red-500'>
          {errors.name?.message ? errors.name?.message : ''}
        </p>

      </label>
      <button type="submit">criar</button>
    </form>

  )
}