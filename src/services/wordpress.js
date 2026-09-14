/**
 * WordPress Headless API Service Layer
 * Centralizes all communication with WordPress REST API (/wp-json/wp/v2)
 * Seamlessly falls back to rich authentic Telugu mock dataset when no WP URL is configured or when offline.
 */

import {
  MOCK_POSTS,
  MOCK_AUTHORS,
  MOCK_CATEGORIES,
  MOCK_TAGS
} from "../data/mockData";
import { mapWordPressPost, mapWordPressAuthor } from "./mapper";

const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL?.replace(/\/$/, "") || "";
const IS_WP_CONFIGURED = Boolean(WORDPRESS_URL);

// Simple in-memory cache to prevent duplicate requests
const cache = new Map();

async function fetchFromWP(endpoint, params = {}) {
  if (!IS_WP_CONFIGURED) return null;

  const url = new URL(`${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.append(k, v);
    }
  });

  const cacheKey = url.toString();
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: { Accept: "application/json" }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`WordPress API error: ${response.status} for ${url.toString()}`);
      return null;
    }

    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (err) {
    console.warn("WordPress fetch failed, falling back to local dataset:", err.message);
    return null;
  }
}

/**
 * Public WordPress Service API
 */
export const wordpressService = {
  isConfigured() {
    return IS_WP_CONFIGURED;
  },

  getApiEndpoint() {
    return WORDPRESS_URL;
  },

  /**
   * Fetch all posts with optional filters (category, tag, author, type, page, perPage)
   */
  async getPosts({ category, tag, author, type, search, page = 1, perPage = 10 } = {}) {
    if (IS_WP_CONFIGURED) {
      const wpPosts = await fetchFromWP("posts", {
        _embed: true,
        page,
        per_page: perPage,
        search: search || undefined
      });
      if (wpPosts && Array.isArray(wpPosts)) {
        let mapped = wpPosts.map(mapWordPressPost);
        if (category) mapped = mapped.filter((p) => p.category === category);
        if (type) mapped = mapped.filter((p) => p.type === type);
        if (author) mapped = mapped.filter((p) => p.authorSlug === author);
        return mapped;
      }
    }

    // Fallback Mock Data Filter
    let filtered = [...MOCK_POSTS];

    if (type) {
      filtered = filtered.filter((p) => p.type === type);
    }
    if (category) {
      filtered = filtered.filter((p) => p.category === category || p.categoryName === category);
    }
    if (tag) {
      filtered = filtered.filter((p) => p.tags.includes(tag));
    }
    if (author) {
      filtered = filtered.filter((p) => p.authorSlug === author || p.authorName === author);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.authorName.toLowerCase().includes(q)
      );
    }

    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  },

  /**
   * Fetch a single post by slug
   */
  async getPostBySlug(slug) {
    if (!slug) return null;

    if (IS_WP_CONFIGURED) {
      const wpPosts = await fetchFromWP("posts", {
        slug,
        _embed: true
      });
      if (wpPosts && wpPosts.length > 0) {
        return mapWordPressPost(wpPosts[0]);
      }
    }

    return MOCK_POSTS.find((p) => p.slug === slug) || null;
  },

  /**
   * Fetch Featured Hero Story
   */
  async getFeaturedStory() {
    const stories = await this.getPosts({ type: "story" });
    const hero = stories.find((s) => s.isFeatured) || stories[0];
    return hero || null;
  },

  /**
   * Fetch Featured Poem
   */
  async getFeaturedPoem() {
    const poems = await this.getPosts({ type: "poem" });
    const featured = poems.find((p) => p.isFeatured) || poems[0];
    return featured || null;
  },

  /**
   * Fetch Latest Stories
   */
  async getLatestStories(limit = 6) {
    const stories = await this.getPosts({ type: "story", perPage: limit });
    return stories;
  },

  /**
   * Fetch Latest Poems
   */
  async getLatestPoems(limit = 6) {
    const poems = await this.getPosts({ type: "poem", perPage: limit });
    return poems;
  },

  /**
   * Fetch Editor's Pick
   */
  async getEditorsPick() {
    const all = await this.getPosts({ perPage: 20 });
    const pick = all.find((p) => p.isEditorPick) || all[0];
    return pick || null;
  },

  /**
   * Fetch Authors List
   */
  async getAuthors() {
    if (IS_WP_CONFIGURED) {
      const wpUsers = await fetchFromWP("users");
      if (wpUsers && Array.isArray(wpUsers)) {
        return wpUsers.map((u) => mapWordPressAuthor(u));
      }
    }
    return MOCK_AUTHORS;
  },

  /**
   * Fetch Author by Slug
   */
  async getAuthorBySlug(slug) {
    const authors = await this.getAuthors();
    return authors.find((a) => a.slug === slug) || null;
  },

  /**
   * Fetch all works by an author
   */
  async getAuthorWorks(authorSlug) {
    const stories = await this.getPosts({ author: authorSlug, type: "story" });
    const poems = await this.getPosts({ author: authorSlug, type: "poem" });
    const essays = await this.getPosts({ author: authorSlug, type: "essay" });
    const reflections = await this.getPosts({ author: authorSlug, type: "reflections" });

    return {
      stories,
      poems,
      essays,
      reflections,
      totalCount: stories.length + poems.length + essays.length + reflections.length
    };
  },

  /**
   * Fetch Categories
   */
  async getCategories() {
    if (IS_WP_CONFIGURED) {
      const wpCats = await fetchFromWP("categories");
      if (wpCats && Array.isArray(wpCats)) {
        return wpCats.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description || "",
          count: c.count || 0,
          color: "#A44A3F"
        }));
      }
    }
    return MOCK_CATEGORIES;
  },

  /**
   * Fetch Tags
   */
  async getTags() {
    if (IS_WP_CONFIGURED) {
      const wpTags = await fetchFromWP("tags");
      if (wpTags && Array.isArray(wpTags)) {
        return wpTags.map((t) => ({
          id: t.id,
          name: t.name,
          slug: t.slug
        }));
      }
    }
    return MOCK_TAGS;
  },

  /**
   * Search across all stories, poems, essays, and authors
   */
  async search(query = "", { type = "all", category = "" } = {}) {
    if (!query.trim()) return { posts: [], authors: [] };

    const q = query.trim().toLowerCase();

    // Search posts
    let posts = await this.getPosts({ search: q });
    if (type && type !== "all") {
      posts = posts.filter((p) => p.type === type);
    }
    if (category) {
      posts = posts.filter((p) => p.category === category);
    }

    // Search authors
    const authors = (await this.getAuthors()).filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.bio.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q)
    );

    return {
      posts,
      authors
    };
  },

  /**
   * Fetch Related Posts
   */
  async getRelatedPosts(currentId, { category, tags = [], limit = 3 } = {}) {
    const all = await this.getPosts({ perPage: 20 });
    const filtered = all
      .filter((p) => p.id !== currentId)
      .filter((p) => p.category === category || (p.tags && p.tags.some((t) => tags.includes(t))));

    return filtered.slice(0, limit);
  }
};
