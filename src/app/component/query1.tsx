import { client } from "@/sanity/lib/client";


export interface Blog1 {
  title: string;
  slug: { current: string };
  image?: { asset: { _ref: string } };
  category: string;
  publishedDate: string;
  author: {
    name: string;
    profileImage?: string;
  };
}


export async function FetchBlogs(): Promise<Blog1[]> {
  const query = `
  *[_type == "blog"] {
    title,
    slug,
    image,
    category,
    publishedDate,
    author->{
      name,
      profileImage
    }
  }
`;


  try {
    const blogs = await client.fetch(query);
    console.log("Fetched Blogs:", blogs); // Debug the fetched data
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}
