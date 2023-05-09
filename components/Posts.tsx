import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Posts() {
  return (
    <>
      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug} className="no-underline">
            <h3 className="mb-0">{post.title}</h3>
          </Link>
          {post.description && <p className="mt-0">{post.description}</p>}
        </article>
      ))}
    </>
  )
}
