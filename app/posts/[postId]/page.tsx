import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { Edit } from "lucide-react"
import { notFound } from "next/navigation"
import { DeletePostButton } from "./_components/delete-post-button"

async function PostDetailsPage(props: PageProps<"/posts/[postId]">) {
  const params = await props.params

  // Ensure a post ID exists.
  if (!params.postId) notFound()

  // Look up the post.
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  })
  // Show 404 if no matching post is found.
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-prose space-y-4 p-4">
      <h1 className="text-4xl font-bold">{post.title}</h1>

      <div className="flex gap-2">
        <Button>
          <Edit />
          Edit
        </Button>
        {/* <Button variant="destructive">
          <Trash />
          Delete
        </Button> */}
        <DeletePostButton
          action={async () => {
            "use server"

            await prisma.post.delete({ where: { id: post.id } })
          }}
        />
      </div>

      <div className="text-sm font-medium text-muted-foreground">
        <p>Created at: {post.createdAt.toLocaleDateString()}</p>
        <p>Updated at: {post.updatedAt.toLocaleDateString()}</p>
      </div>
      <p className="whitespace-pre-line">{post.content}</p>
    </div>
  )
}

export default PostDetailsPage
