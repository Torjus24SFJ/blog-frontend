export interface BlogPost {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    titleImage: any
    _id: string
    _createdAt: string
    title: string
    slug: {
      current: string
    }
    content?: unknown[] 
    smallDescription?: string
  }
  
  export const allPostsQuery = `*[_type == "blog"]{
    _id,
    _createdAt,
    title,
    slug,
    content,
    mainImage,
  }`