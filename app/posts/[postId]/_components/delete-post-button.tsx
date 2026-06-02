"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  action: () => Promise<void>
}

function DeletePostButton({ action }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleClick() {
    // Prevent accidental destructive actions by forcing explicit confirmation
    const shouldDelete = confirm("Are you sure you want to delete this post?")
    if (!shouldDelete) return

    // Lock the UI to avoid duplicate delete requests
    setIsLoading(true)

    // Deletion logic is injected so this button stays reusable
    await action()

    // Restore interactivity once the operation completes
    setIsLoading(false)
    // toast.success(`Succesfully deleted post: "${}"`)
    toast.success("Successfully deleted post!")

    // Replace instead of push so the deleted post isn't reachable via back button
    router.replace("/posts")
  }

  return (
    <Button variant="destructive" onClick={handleClick} disabled={isLoading}>
      {isLoading ? <Spinner /> : <Trash />}
      Delete
    </Button>
  )
}

export { DeletePostButton }
