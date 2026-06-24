import { MetadataRoute } from "next";

const BASE_URL = "https://how-to-blog-4jn.pages.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
