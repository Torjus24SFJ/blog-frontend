import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import { BlogPost } from "@/lib/sanity.types";
import Link from "next/link";

async function getPosts() {
  const query = `*[_type == "blog"]{
    _id,
    title,
    slug,
    titleImage{
      asset->{
        _id,
        url
      },
      alt
    },
    content,
    smallDescription,
  }`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col items-center gap-20">
      {posts.map((post: BlogPost) => (
        <Link
          href={`/blog/${post.slug.current}`}
          key={post._id}
          className="w-150"
        >
          <article
            key={post._id}
            className="p-4 w-150 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex flex-col">
              <h2 className="text-2xl text-neutral-800 font-bold hover:opacity-80">
                {post.title}
              </h2>
              {post.titleImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(post.titleImage).url()}
                  alt={post.titleImage.alt || post.title}
                  className="object-cover w-150 h-auto mt-4"
                />
              )}
              {post.smallDescription && (
                <p className="text-gray-600 mt-2 text-[18px]">{post.smallDescription}</p>
              )}
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
