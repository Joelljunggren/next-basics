import { CreatePostForm } from "./_components/create-post-form"

export default function CreatePostPage() {
  return (
    <div className="mx-auto max-w-prose space-y-4 p-4">
      <h1 className="text-4xl font-bold">Create Post</h1>

      {/* Create post form here */}
      <CreatePostForm />
    </div>
  )
}
