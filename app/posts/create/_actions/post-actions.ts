"use server"
// This must run on the server because it touches the database

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { z } from "zod"

const createPostSchema = z.object({
  title: z
    .string()
    // Validation lives here so invalid data never reaches the database
    .min(1, "Title is required")
    .max(32, "Title cannot be longer than 32 characters"),
  content: z
    .string()
    // Server-side enforcement protects against bypassed client validation
    .min(1, "Content is required")
    .max(5000, "Content cannot be lnger than 5000 characters"),
})

export async function createPost(values: z.infer<typeof createPostSchema>) {
  // Parsing here guarantees this action only operates on trusted, validated data
  // and provides a single source of truth for input constraints
  const data = createPostSchema.parse(values)
  console.log(data)

  const newPost = await prisma.post.create({
    data: {
      // Explicit mapping avoids accidental mass assignment
      title: data.title,
      content: data.content,
    },
  })
  //   redirect(`/posts/${newPost.id}`)
  return newPost
}
