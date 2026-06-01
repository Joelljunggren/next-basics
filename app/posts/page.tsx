import { PostCard } from "@/components/post-card"
import prisma from "@/lib/prisma"

export default async function PostsPage() {
  const posts = await prisma.post.findMany()

  return (
    <div className="p-6">
      <h1 className="mb-6 text-4xl font-bold">Posts</h1>
      {/* {Render posts here... } */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
