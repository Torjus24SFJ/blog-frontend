import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity.image';
import { BlogPost } from '@/lib/sanity.types';

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "blog"]{ "slug": slug.current }`);
  return posts;
}


async function getPost(slug: string): Promise<BlogPost> {
  return await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      _id,
      title,
      titleImage { asset->{ url }, alt },
      content
    }`,
    { slug }
  );
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1 className='text-2xl font-bold'>{post.title}</h1>
      {post.titleImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(post.titleImage).url()}
          alt={post.titleImage.alt}
          className='w-150'
        />
      )}
    </article>
  );
}