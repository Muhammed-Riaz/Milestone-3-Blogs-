import { client } from "@/sanity/lib/client";

export interface Blog {
  title: string;
  slug: { current: string };
  image?: { asset: { _ref: string } };
  category: string;
  publishedDate: string;
  content?: string;
  conclusion?: string;
  postedAt?: string;
  _id:string;
  authorName?: string;
  author: {
    name: string;
    profileImage?: string;
  };
  comments?: Array<{
    authorName: string;
    commentText: string;
    createdAt: string;
    _id:string
  }>;
}

// Fetch single blog by slug
export async function FetchBlogBySlug(slug?: string){
  const query = `
  *[_type == "blog" && slug.current == $slug][0] {
    title,
    slug,
    _id,
    image,
    category,
    publishedDate,
    content,
    conclusion,
    postedAt,
    authorName,
    author->{
      name,
      profileImage
    },
    "comments": comments[] {
      authorName,
      commentText,
      createdAt,
      _id
    }
  }
  `;
  
  try {
    const blog = await client.fetch(query, { slug });
    return blog || null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}
