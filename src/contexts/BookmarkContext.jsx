import React, { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("kk_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("kk_bookmarks", JSON.stringify(bookmarks));
    } catch (e) {
      console.error("Failed to save bookmarks", e);
    }
  }, [bookmarks]);

  const isBookmarked = (id) => {
    return bookmarks.some((item) => item.id === id);
  };

  const toggleBookmark = (post) => {
    if (!post) return;
    setBookmarks((prev) => {
      const exists = prev.some((item) => item.id === post.id);
      if (exists) {
        return prev.filter((item) => item.id !== post.id);
      } else {
        const itemToSave = {
          id: post.id,
          slug: post.slug,
          type: post.type || "story",
          title: post.title,
          excerpt: post.excerpt,
          featuredImage: post.featuredImage,
          authorName: post.authorName,
          categoryName: post.categoryName,
          readTime: post.readTime,
          savedAt: new Date().toISOString()
        };
        return [itemToSave, ...prev];
      }
    });
  };

  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        bookmarkCount: bookmarks.length,
        isBookmarked,
        toggleBookmark,
        removeBookmark,
        clearAllBookmarks
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
