import { ClientButton } from "./_components/client-button"

export default function AboutPage() {
  return (
    <div className="flex min-h-svh flex-col p-6">
      <h1 className="text-3xl">About page</h1>
      <article className="mt-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
        temporibus sequi velit obcaecati quo repudiandae modi sapiente atque
        porro dignissimos!
      </article>
      <article className="mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod optio
        earum ipsum sunt deleniti reprehenderit nisi aliquid, consectetur
        similique, iste recusandae vero atque ullam quo. Pariatur, rem vitae
        nobis odit rerum voluptatem molestias illum possimus hic facilis
        molestiae dolor illo.
      </article>
      <ClientButton />
    </div>
  )
}
