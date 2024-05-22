import { createClient } from "next-sanity";
import ImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  apiVersion: "2021-05-03",
  dataset: "production",
  projectId: "hzl8rn7l",
  useCdn: false,
});

const builder = ImageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}
