import { client } from "@/sanity/lib/client"
import Link from "next/link"

export const dynamic = "force-dynamic"
export const revalidate = 0

const POST_QUERY = `*[_type == "bitacoraPost" && slug.current == $slug && published == true][0]{
  _id,
  title,
  excerpt,
  publishedAt,
  "slug": slug.current,
  "imageUrl": coverImage.asset->url,
  body
}`

async function getPost(slug: string) {
  try {
    return await client.fetch(POST_QUERY, { slug })
  } catch (error) {
    console.error("Error loading bitacora post from Sanity:", error)
    return null
  }
}

export default async function BitacoraPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-sand px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/#bitacora"
            className="inline-flex items-center text-sm text-carbon/70 hover:text-copper transition-colors mb-8"
          >
            ← Volver a Bitácora
          </Link>

          <h1 className="font-serif text-4xl text-carbon mb-4">
            Historia no encontrada
          </h1>

          <p className="text-carbon/70">
            No pudimos encontrar esta entrada de Bitácora.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-sand px-6 py-24">
      <div className="max-w-3xl mx-auto mb-6">
        <Link
          href="/#bitacora"
          className="inline-flex items-center text-sm text-carbon/70 hover:text-copper transition-colors"
        >
          ← Volver a Bitácora
        </Link>
      </div>

      <article className="max-w-3xl mx-auto">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full rounded-xl mb-8"
          />
        )}

        <h1 className="font-serif text-4xl md:text-5xl text-carbon mb-4">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-carbon/75 mb-6">
            {post.excerpt}
          </p>
        )}

        {post.publishedAt && (
          <p className="text-sm text-carbon/50 mb-10">
            {new Date(post.publishedAt).toLocaleDateString("es-AR")}
          </p>
        )}

        <div className="prose prose-lg max-w-none text-carbon">
          {Array.isArray(post.body) ? (
            post.body.map((block: any) => {
              if (block._type === "block") {
                return (
                  <p key={block._key} className="mb-4 leading-relaxed">
                    {block.children?.map((child: any) => child.text).join("")}
                  </p>
                )
              }

              return null
            })
          ) : (
            <p>No hay contenido disponible.</p>
          )}
        </div>
      </article>
    </main>
  )
}