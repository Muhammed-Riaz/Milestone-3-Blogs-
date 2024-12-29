import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client"; // Adjust path as needed
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

/**
 * Build a Sanity image URL from the given source.
 * @param source - The Sanity image source
 * @returns A URL builder for the image
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
