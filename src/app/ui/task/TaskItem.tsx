'use cleint'

import { Task } from '@/app/lib/types'
import { useTaskItem } from '@/app/lib/hooks/useTaskItem'
import { Button } from '../Button'

type TaskItemProps = {
  task: Task,
  index: number
}

export function TaskItem({ task, index }: TaskItemProps) {

  const {
    handleIs,
    handleSubmit,
    hanldeDeleteTask,
    hanldeUpdateTask,
    is,
    register,
    errors
  } = useTaskItem()


  let component: JSX.Element

  if (is) {
    component = (
      <form
        onSubmit={handleSubmit((e) =>hanldeUpdateTask(e, task.id))}
        className='flex justify-between'
      >
        <input
          type="checkbox"
          {...register('completend')}
        />
        <input
          type="text"
          {...register('name')}
          defaultValue={task.name}
          className='text-black pl-2 outline-none'
        />
        <p>{errors.name?.message ? errors.name.message : ''}</p>

        <button type="submit">concluir</button>

        <Button  onClick={handleIs}>cancelar</Button>
      </form>
    )
  } else {
    component = (
      <li
        className={`flex justify-between items-center h-8 ${task.completend ? 'order-1' : ''} ${index != 0 && 'border-t'}`}
      >
        <input
          type="checkbox"
          checked={task.completend}
        />
        <h2>{task.name}</h2>
        <div className='flex gap-2'>
          <Button onClick={() => hanldeDeleteTask(task.id)}>Apagar</Button>
          <Button onClick={handleIs}>Editar</Button>
        </div>
      </li>
    )
  }

  return (
    <>
      {component}
    </>
  )
}