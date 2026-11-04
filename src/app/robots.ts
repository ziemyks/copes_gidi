import type { MetadataRoute } from "next";
import { isPreviewDeployment, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // Preview pages carry noindex metadata; crawling stays allowed so it can be read.
    sitemap: isPreviewDeployment() ? undefined : `${siteUrl()}/sitemap.xml`,
  };
}
