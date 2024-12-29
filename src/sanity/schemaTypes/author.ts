

import { defineType } from "sanity";

export const authorSchema = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name" },
    { 
      name: "profileImage", 
      type: "image", 
      title: "Profile Image", 
      options: { hotspot: true },
    },
  ],
});
