import React from "react";
import { Helmet } from "react-helmet-async";

export function SEOHelmet({
  title,
  description = "కీర్తి కృష్ణ - తెలుగు కథలు, కవితలు, వ్యాసాలు మరియు ఆలోచనలతో కూడిన ఆధునిక డిజిటల్ సాహిత్య పత్రిక.",
  image = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
  type = "website",
  slug = "",
  author = "కీర్తి కృష్ణ",
  publishedTime,
  tags = []
}) {
  const siteTitle = "కీర్తి కృష్ణ | Keerti Krishna";
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - తెలుగు సాహితీ మంజూష`;
  const canonicalUrl = `https://keertikrishna.org/${slug ? slug.replace(/^\//, "") : ""}`;

  const jsonLd = type === "article" ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "కీర్తి కృష్ణ (Keerti Krishna)",
      "logo": {
        "@type": "ImageObject",
        "url": "https://keertikrishna.org/logo.png"
      }
    },
    "datePublished": publishedTime || new Date().toISOString(),
    "mainEntityOfPage": canonicalUrl
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "కీర్తి కృష్ణ (Keerti Krishna)",
    "url": "https://keertikrishna.org",
    "description": description
  };

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="కీర్తి కృష్ణ" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
