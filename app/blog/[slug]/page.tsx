import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.image";
import { BlogPost } from "@/lib/sanity.types";

export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "blog"]{ "slug": slug.current }`
  );
  return posts;
}

async function getPost(slug: string): Promise<BlogPost> {
  return await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      _id,
      title,
      titleImage { asset->{ url }, alt },
      content,
      smallDescription,
    }`,
    { slug }
  );
}

const components = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={urlFor(value).url()}
        alt={value.alt || ""}
        className="my-4 rounded-lg max-w-full h-auto"
      />
    ),
  },
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4">{children}</p>
    ),
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-3xl font-bold mt-10 mb-6">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link: ({ value, children }: { value: any; children: React.ReactNode }) => (
      <a
        href={value?.href}
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc pl-6 mb-4">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal pl-6 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="mb-2">{children}</li>
    ),
  },
};

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div className="text-center py-10">Post not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      {post.titleImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(post.titleImage).url()}
          alt={post.titleImage.alt || post.title}
          className="w-full max-h-96 object-cover rounded-lg mb-8"
        />
      )}
      <div className="text-gray-600 mt-2 text-[18px]">
        <PortableText value={post.content} components={components} />
      </div>
    </article>
  );
}
