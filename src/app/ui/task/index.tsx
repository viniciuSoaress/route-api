'use client'

import { useState } from "react";

import { ListTasks } from "./ListTasks";
import { CreateTask } from "./CreateTask";
import { Button } from "../Button";


export function Task() {

  const [isCreate, setIsCreate] = useState(false)

  function handleCreate() {
    setIsCreate(is => !is)
  }


  return (
    <div className="w-full">
      
      <div className="flex mb-10 justify-between px-3 border-b border-gray-50 items-center">
       <h1>Lista De Tarefas</h1>
        <Button
          onClick={handleCreate}
        >
          {isCreate ? 'Cancelar' : 'Create'}
        </Button>
      </div>

      <div className="h-10">
        {isCreate && (
          <CreateTask />
        )}
      </div>
      <ListTasks />

    </div>
  )
}