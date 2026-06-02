"use client"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@tanstack/react-form"
import { Save } from "lucide-react"
import { z } from "zod"
import { editPost } from "../_actions/post-actions"
import { toast } from "sonner"

//Explanations of the code can be found in app/post/create/_components/create-post-form.tsx

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

type Props = {
  post: {
    title: string
    content: string
    id: string
  }
}

function PostEditForm({ post }: Props) {
  const form = useForm({
    defaultValues: {
      title: post.title,
      content: post.content,
    },
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const updatedPost = await editPost({
        id: post.id,
        title: value.title,
        content: value.content,
      })
      formApi.reset({
        title: updatedPost.title,
        content: updatedPost.content,
      })
      toast.success("Successfully updated post!")
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
                  className="h-48"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
          {([isSubmitting]) => (
            <Field orientation="horizontal">
              <Button
                type="reset"
                disabled={isSubmitting}
                onClick={(ev) => {
                  ev.preventDefault()
                  form.reset()
                }}
                variant="secondary"
              >
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : <Save />}
                Save Post
              </Button>
            </Field>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  )
}

export { PostEditForm }
