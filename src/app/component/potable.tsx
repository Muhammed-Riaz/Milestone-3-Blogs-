import { TypedObject } from "sanity";

const convertToPortableText = (text: string): TypedObject[] => [
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        text: text,
      },
    ],
  },
];
export default convertToPortableText
