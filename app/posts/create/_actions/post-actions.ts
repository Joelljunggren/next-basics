"use server"
import { auth } from "@/lib/auth"
// This must run on the server because it touches the database

import prisma from "@/lib/prisma"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

const createPostSchema = z.object({
  title: z
    .string()
    // Reject empty titles so we don’t save incomplete posts
    .min(1, "Title is required")
    .max(32, "Title cannot be longer than 32 characters"),
  content: z
    .string()
    // Prevent saving a post with no content
    .min(1, "Content is required")
    .max(5000, "Content cannot be lnger than 5000 characters"),
})

export async function createPost(values: z.infer<typeof createPostSchema>) {
  // Check that the incoming data has the expected shape and values.
  // If anything is missing or invalid, this will stop the function immediately.
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect("/sign-in")

  const data = createPostSchema.parse(values)
  console.log(data)

  const newPost = await prisma.post.create({
    data: {
      // Explicit mapping avoids accidental mass assignment
      title: data.title,
      content: data.content,
      authorId: session.user.id,
    },
  })
  //   redirect(`/posts/${newPost.id}`)
  return newPost
}
