import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"
import clsx from "clsx"
import { Metadata } from "next"
import { Mdx } from "@/components/Template/mdx-components"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/")
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="pb-24 w-full prose prose-sm dark:prose-invert max-w-[1100px] mx-auto h-fit">
      <section className="hidden h-1 xl:!col-start-4 xl:row-start-2 md:block fixed">
        {post.headings ? (
          <div className="flex justify-end w-full">
            <div className="space-y-2 text-sm">
              <h2 className="text-[#f1f1f1] mb-0">Sections</h2>

              {post.headings.map((heading: any) => {
                return (
                  <a
                    key={heading.slug}
                    href={`#${heading.slug}`}
                    className={clsx("block text-gray-400 underline-offset-2 no-underline transition-all hover:text-white hover:underline", {
                      "pl-3": heading.heading === 2,
                      "pl-5": heading.heading === 3
                    })}>
                    {heading.text}
                  </a>
                )
              })}
            </div>
          </div>
        ) : null}
      </section>

      <div className="max-w-[680px] mx-auto w-full">
        <h1 className="mb-2 max-w-[680px]">{post.title}</h1>
        {post.description && <p className="m-0 text-xl text-slate-700 dark:text-slate-200 max-w-[680px]">{post.description}</p>}
        <Mdx code={post.body.code} />
      </div>
    </article>
  )
}
