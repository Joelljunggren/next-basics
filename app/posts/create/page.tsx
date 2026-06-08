import { auth } from "@/lib/auth"
import { CreatePostForm } from "./_components/create-post-form"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function CreatePostPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) redirect("/sign-in")

  return (
    <div className="mx-auto max-w-prose space-y-4 p-4">
      <h1 className="text-4xl font-bold">Create Post</h1>

      {/* Create post form here */}
      <CreatePostForm />
    </div>
  )
}
