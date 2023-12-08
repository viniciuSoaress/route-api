'use client'

import { useState, useEffect } from 'react'

type Task = {
  id: string,
  name: string,
  completend: boolean,
}

export function ListTasks() {

  const [tasks, setTasks] = useState<Task[]>([])


  useEffect(() => {
    async function getDataTask() {
      const data = await fetch('/lib/api/tarefa')
      const task: Task[] = await data.json()

      setTasks(task)
    }

    getDataTask()
  }, [tasks])

  return (
    <ul className='flex flex-col'>
      {tasks.length <= 0 ? (
        <li>sem tarefas...</li>
      ) : (
        tasks.map(task => (
          <TaskItem task={task} key={task.id} />
        )))}
    </ul>
  )
}


import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


const TaskSchema = z.object({
  name: z.string(),
  completend: z.boolean().optional().default(false)
})

type Tas = z.infer<typeof TaskSchema>

type TaskItemProps = {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {

  const [is, setIs] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
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

  async function hanldeUpdateTask(data: Tas) {
    await fetch('/lib/api/tarefa', {
      method: 'PUT',
      body: JSON.stringify({ data, id: task.id })
    })
    handleIs()
    window.onload
  }


  let component: JSX.Element

  if (is) {
    component = (
      <form
        onSubmit={handleSubmit(hanldeUpdateTask)}
      >
        <input
          type="checkbox"
          {...register('completend')}
        />
        <input
          type="text"
          {...register('name')}
          defaultValue={task.name}
          className='text-black'
        />

        <button type="submit">concluir</button>

        <button onClick={handleIs}>cancelar</button>
      </form>
    )
  } else {
    component = (
      <>
        <li
          className={`flex justify-between ${task.completend ? 'order-1': ''}`}
        >
          <input
            type="checkbox"
            checked={task.completend}
          />
          <h2>{task.name}</h2>
          <div className='flex gap-2'>
            <button onClick={() => hanldeDeleteTask(task.id)}>Apagar</button>
            <button onClick={handleIs}>editar</button>
          </div>
        </li>
      </>
    )
  }



  return (
    <>
      {component}
    </>
  )
}