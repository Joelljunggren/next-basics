"use server"
// This must run on the server because it touches the database

import prisma from "@/lib/prisma"
import { z } from "zod"

const editPostSchema = z.object({
  id: z.string().min(1), // Ensure we know which post should be updated
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

export async function editPost(values: z.infer<typeof editPostSchema>) {
  // Check that the incoming data has the expected shape and values.
  // If anything is missing or invalid, this will stop the function immediately.
  const data = editPostSchema.parse(values)

  // Find the existing post by its ID and update its fields in the database.
  // This permanently changes the stored title and content.
  const updatedPost = await prisma.post.update({
    where: { id: data.id },
    data: {
      title: data.title,
      content: data.content,
    },
  })

  return updatedPost
}
