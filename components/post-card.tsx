import type { Post } from "@/generated/prisma/client"
import { MoveRight } from "lucide-react"
import Link from "next/link"

import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

type Props = {
  post: Post
}

function PostCard({ post }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{post.title}</h2>
        </CardTitle>
        <CardDescription>
          Created at: {post.createdAt.toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-4">{post.content}</p>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/posts/${post.id}`}>
            View Post
            <MoveRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export { PostCard }
