"use client"
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createPost } from "../_actions/post-actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(32, "Title cannot be longer than 32 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content cannot be lnger than 5000 characters"),
})

function CreatePostForm() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      const newPost = await createPost(value)

      toast.success(`${newPost.title} Created successfully!`, {
        // position: "bottom-center",
        // duration: 6000,
      })
      router.push(`/posts/${newPost.id}`)
    },
  })

  return (
    <form
      method="POST"
      onSubmit={(ev) => {
        ev.preventDefault()
        form.handleSubmit(ev)
      }}
    >
      <FieldGroup>
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(ev) => field.handleChange(ev.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  placeholder="Add title"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="content">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(ev) => field.handleChange(ev.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  placeholder="Add content"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <Field orientation="horizontal">
          <Button type="submit">Create Post</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export { CreatePostForm }
