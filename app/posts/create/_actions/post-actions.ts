"use server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { z } from "zod"

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(32, "Title cannot be longer than 32 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content cannot be lnger than 5000 characters"),
})

export async function createPost(values: z.infer<typeof createPostSchema>) {
  const data = createPostSchema.parse(values)
  console.log(data)

  const newPost = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
    },
  })
  //   redirect(`/posts/${newPost.id}`)
  return newPost
}
