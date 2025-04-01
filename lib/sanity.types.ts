export interface BlogPost {
    titleImage: any
    _id: string
    _createdAt: string
    title: string
    slug: {
      current: string
    }
    content?: unknown[] 
  }
  
  export const allPostsQuery = `*[_type == "blog"]{
    _id,
    _createdAt,
    title,
    slug,
    content,
    mainImage,
  }`