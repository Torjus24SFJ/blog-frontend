import { PortableTextBlock } from "@sanity/types";

export interface BlogPost {
  titleImage: SanityImage;
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  content?: PortableTextBlock[];
  smallDescription?: string;
}

export interface LinkAnnotation {
  _type: "link";
  href: string;
  _key?: string;
}

export interface SanityImage {
  type: "image";
  asset: {
    _ref: "string";
    type: "reference";
  };
  alt?: "string";
}

export const allPostsQuery = `*[_type == "blog"]{
    _id,
    _createdAt,
    title,
    slug,
    content,
    mainImage,
  }`;
