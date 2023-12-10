'use client'

import { useState, useEffect } from 'react'
import { TaskItem } from './TaskItem'

import {Task} from '@/app/lib/types'

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
    <ul className='flex flex-col mt-5 bg-gray-50 p-4 gap-2 rounded'>
      {tasks.length <= 0 ? (
        <li>sem tarefas...</li>
      ) : (
        tasks.map((task: Task, index: number) => (
          <TaskItem task={task} key={task.id} index={index}/>
        )))}
    </ul>
  )
}
