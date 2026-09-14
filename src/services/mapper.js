/**
 * Normalizes WordPress REST API response objects into clean domain entities.
 */

// Helper to strip HTML tags for clean excerpts
export function stripHtml(html = "") {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

// Calculate estimated reading time in Telugu
export function calculateReadTime(text = "") {
  const clean = stripHtml(text);
  const words = clean.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 150); // Telugu reading pace ~150-180 wpm
  return `${minutes} నిమిషాలు`;
}

// Map a WP Post object
export function mapWordPressPost(wpPost) {
  if (!wpPost) return null;

  // Extract featured media from embedded data if available
  let featuredImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85";
  if (wpPost._embedded && wpPost._embedded["wp:featuredmedia"] && wpPost._embedded["wp:featuredmedia"][0]) {
    const media = wpPost._embedded["wp:featuredmedia"][0];
    featuredImage = media.source_url || (media.media_details && media.media_details.sizes && media.media_details.sizes.large ? media.media_details.sizes.large.source_url : featuredImage);
  }

  // Extract author info
  let authorName = "రచయిత";
  let authorSlug = "author";
  let authorAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
  if (wpPost._embedded && wpPost._embedded["author"] && wpPost._embedded["author"][0]) {
    const auth = wpPost._embedded["author"][0];
    authorName = auth.name || authorName;
    authorSlug = auth.slug || authorSlug;
    if (auth.avatar_urls && auth.avatar_urls["96"]) {
      authorAvatar = auth.avatar_urls["96"];
    }
  }

  // Extract categories & tags
  let categoryName = "సాహిత్యం";
  let categorySlug = "literature";
  let categoryColor = "#A44A3F";
  let tags = [];

  if (wpPost._embedded && wpPost._embedded["wp:term"]) {
    const terms = wpPost._embedded["wp:term"].flat();
    const catTerm = terms.find((t) => t.taxonomy === "category");
    if (catTerm) {
      categoryName = catTerm.name;
      categorySlug = catTerm.slug;
    }
    const tagTerms = terms.filter((t) => t.taxonomy === "post_tag");
    tags = tagTerms.map((t) => t.name);
  }

  const rawContent = wpPost.content?.rendered || "";
  const rawExcerpt = wpPost.excerpt?.rendered || "";
  const cleanExcerpt = stripHtml(rawExcerpt) || stripHtml(rawContent).slice(0, 180) + "...";

  // Determine post type (story vs poem vs essay) based on category or slug
  let type = "story";
  if (categorySlug.includes("poem") || categorySlug.includes("kavita") || categorySlug.includes("kavithalu")) {
    type = "poem";
    categoryColor = "#C07D3E";
  } else if (categorySlug.includes("essay") || categorySlug.includes("vyasalu")) {
    type = "essay";
    categoryColor = "#2C423B";
  } else if (categorySlug.includes("reflection") || categorySlug.includes("alochana")) {
    type = "reflections";
    categoryColor = "#1B2A38";
  }

  return {
    id: wpPost.id,
    slug: wpPost.slug,
    title: wpPost.title?.rendered ? stripHtml(wpPost.title.rendered) : "శీర్షిక",
    content: rawContent,
    excerpt: cleanExcerpt,
    featuredImage,
    authorId: wpPost.author,
    authorName,
    authorSlug,
    authorAvatar,
    date: wpPost.date ? wpPost.date.split("T")[0] : new Date().toISOString().split("T")[0],
    readTime: calculateReadTime(rawContent),
    wordCount: stripHtml(rawContent).trim().split(/\s+/).length,
    category: categorySlug,
    categoryName,
    categoryColor,
    tags: tags.length > 0 ? tags : ["సాహిత్యం"],
    isFeatured: wpPost.sticky || false,
    isEditorPick: false,
    type
  };
}

// Map a WP User/Author object
export function mapWordPressAuthor(wpAuthor, postCounts = {}) {
  if (!wpAuthor) return null;

  return {
    id: wpAuthor.id,
    name: wpAuthor.name || "రచయిత",
    slug: wpAuthor.slug || "author",
    role: "సాహితీవేత్త",
    bio: wpAuthor.description || "తెలుగు రచయిత మరియు సాహితీ ప్రేమికులు.",
    avatar: (wpAuthor.avatar_urls && (wpAuthor.avatar_urls["96"] || wpAuthor.avatar_urls["48"])) || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    location: "ఆంధ్రప్రదేశ్ / తెలంగాణ",
    social: {
      twitter: wpAuthor.link || "",
      email: ""
    },
    stats: {
      storiesCount: postCounts.storiesCount || 0,
      poemsCount: postCounts.poemsCount || 0,
      essaysCount: postCounts.essaysCount || 0
    }
  };
}
