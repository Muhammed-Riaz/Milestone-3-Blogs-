import { defineType } from "sanity";

export const blogSchema = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", title: "Slug" },
    { name: "image", type: "image", title: "Image" },
    { name: "category", type: "string", title: "Category" },
    { name: "publishedDate", type: "date", title: "Published Date" },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [{ type: "block" }],
    },
    {
      name: "conclusion",
      type: "array",
      title: "Conclusion",
      of: [{ type: "block" }],
    },
    
    {
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "comments",
      type: "array",
      title: "Comments",
      of: [
        {
          type: "object",
          fields: [
            { name: "authorName", type: "string", title: "Author Name" },
            { name: "commentText", type: "text", title: "Comment Text" },
            { name: "createdAt", type: "datetime", title: "Created At" },
          ],
        },
      ],
    },
  ],
});
