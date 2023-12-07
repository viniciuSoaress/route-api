import { Task } from "./ui/task"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
     <h2>home page</h2>
     <Task />
    </main>
  )
}
