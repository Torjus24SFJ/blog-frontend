import { client } from "@/lib/sanity";
import Link from "next/link";
import { BlogPost } from '@/lib/sanity.types';

async function getPosts() {
  return await client.fetch(`*[_type == "blog"]{
    _id,
    title,
    slug,
    titleImage { asset->{ url }, alt }
  }`);
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(
          (
            post: BlogPost
          ) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              {post.title}
            </Link>
          )
        )}
      </ul>
    </div>
  );
}
