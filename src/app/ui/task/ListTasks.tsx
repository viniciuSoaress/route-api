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
      const task = await data.json()

      setTasks(await task)
    }

    getDataTask()
  }, [])

  return (
    <ul>
      {tasks.length <= 0 ? (
        <li>sem tarefas...</li>
      ) : (
        tasks.map(task => (
          <li key={task.id}>
            <h2>{task.name}</h2>
            <p>{task.completend}</p>
          </li>
        )))}
    </ul>
  )
}