import { createClient } from "@/lib/supabase/server"
import { Suspense } from "react"

async function TodosData() {
  const supabase = await createClient()
  const { data: todos, error } = await supabase.from("todos").select()

  if (error) {
    console.log(error)
  }

  return <pre>{JSON.stringify(todos, null, 2)}</pre>
}

export default function SupabaseDemo() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodosData />
    </Suspense>
  )
}
