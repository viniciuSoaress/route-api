import { ListTasks } from "./ListTasks";
import { CreateTask } from "./CreateTask";


export function Task(){
  return(
    <div>
      <h2>lista de tarefas</h2>
      <ListTasks />
      <CreateTask />
    </div>
  )
}