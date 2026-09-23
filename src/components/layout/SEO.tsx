// src/components/shared/SEO.tsx
import React from "react"
import { Helmet } from "react-helmet-async"

interface SEOProps {
  title: string
  description: string
  url: string
  type?: "website" | "article"
  publishDate?: string
}

// Safely stringifies objects for script injection by replacing HTML-sensitive characters
// with their Unicode escape equivalents. JSON parsers and crawlers resolve these back automatically.
const safeJsonStringify = (obj: unknown): string => {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url,
  type = "website",
  publishDate,
}) => {
  const siteName = "Syed Umair Ali"
  const defaultImage = "https://syedumaircodes.vercel.app/og-image.png"

  // JSON-LD Structured Data for AEO/GEO
  const jsonLd =
    type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description: description,
          image: defaultImage,
          author: {
            "@type": "Person",
            name: "Syed Umair Ali",
            url: "https://syedumaircodes.vercel.app/",
          },
          publisher: {
            "@type": "Person",
            name: "Syed Umair Ali",
            logo: {
              "@type": "ImageObject",
              url: defaultImage,
            },
          },
          datePublished: publishDate
            ? new Date(publishDate).toISOString()
            : undefined,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        }
      : null

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Social */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultImage} />

      {/* Inject Article JSON-LD Schema if it's a blog post */}
      {jsonLd && (
        <script type="application/ld+json">{safeJsonStringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}

export default SEO
