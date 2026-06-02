import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { PostEditForm } from "./_components/post-edit-form"

async function PostEditPage(props: PageProps<"/posts/[postId]/edit">) {
  const params = await props.params

  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  })

  if (!post) notFound()

  return (
    <div className="mx-auto max-w-prose space-y-4 p-4">
      <h1 className="text-4xl font-bold">Edit Post</h1>

      {/* Add edit post form here */}
      <PostEditForm post={post}></PostEditForm>
    </div>
  )
}

export default PostEditPage
