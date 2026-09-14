import React from "react";
import { Link } from "react-router-dom";
import { Clock, Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "../../contexts/BookmarkContext";

export function StoryCard({ story, variant = "standard" }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = story ? isBookmarked(story.id) : false;

  if (!story) return null;

  if (variant === "featured-hero") {
    return (
      <article className="group relative bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-[#A44A3F] text-white text-xs font-telugu-sans font-semibold rounded-full tracking-wide shadow-sm">
                {story.categoryName || "కథ"}
              </span>
            </div>
          </div>
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted,#57534E)] font-literary-sans font-medium">
                <Clock className="w-3.5 h-3.5 text-[#A44A3F]" />
                <span>{story.readTime}</span>
                <span>•</span>
                <span>{story.date}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-[1.35] group-hover:text-[#A44A3F] transition-colors py-0.5">
                <Link to={`/stories/${story.slug}`}>{story.title}</Link>
              </h2>
              <p className="text-[var(--text-sub,#44403C)] font-telugu-sans text-sm sm:text-base leading-relaxed line-clamp-4">
                {story.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--border-theme,#D5CCC0)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                to={`/authors/${story.authorSlug}`}
                className="flex items-center gap-3 group/author"
              >
                <img
                  src={story.authorAvatar}
                  alt={story.authorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--border-theme,#D5CCC0)] group-hover/author:ring-[#A44A3F] transition shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-telugu-serif font-bold text-[var(--text-main,#1C1917)] group-hover/author:text-[#A44A3F] transition">
                    {story.authorName}
                  </h4>
                  <span className="text-xs text-[var(--text-muted,#57534E)] font-telugu-sans font-medium">
                    రచయిత
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleBookmark(story);
                  }}
                  className="p-2.5 rounded-full border border-[var(--border-theme,#D5CCC0)] hover:bg-black/5 dark:hover:bg-white/10 transition text-[var(--text-sub,#44403C)]"
                  title={bookmarked ? "బుక్‌మార్క్ తీసివేయండి" : "దాచుకోండి"}
                >
                  {bookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-[#A44A3F] fill-current" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <Link
                  to={`/stories/${story.slug}`}
                  className="flex-1 sm:flex-initial text-center inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#1C1917] hover:bg-[#A44A3F] dark:bg-stone-200 dark:hover:bg-[#A44A3F] dark:hover:text-white dark:text-[#1C1917] text-white text-xs font-telugu-sans font-semibold rounded-full transition shadow-xs"
                >
                  కథ చదవండి →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={story.featuredImage}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#A44A3F] text-white text-[11px] font-telugu-sans font-semibold rounded-full shadow-xs">
            {story.categoryName || "కథ"}
          </span>
        </div>
        <div className="p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted,#57534E)] font-literary-sans font-medium">
            <Clock className="w-3 h-3 text-[#A44A3F]" />
            <span>{story.readTime}</span>
            <span>•</span>
            <span>{story.date}</span>
          </div>
          <h3 className="text-xl font-telugu-serif font-bold text-[var(--text-main,#1C1917)] leading-normal group-hover:text-[#A44A3F] transition-colors py-0.5">
            <Link to={`/stories/${story.slug}`}>{story.title}</Link>
          </h3>
          <p className="text-[var(--text-sub,#44403C)] font-telugu-sans text-xs md:text-sm leading-relaxed line-clamp-3">
            {story.excerpt}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 mt-2 border-t border-[var(--border-theme,#D5CCC0)]/80 flex items-center justify-between">
        <Link
          to={`/authors/${story.authorSlug}`}
          className="flex items-center gap-2 group/author pt-3"
        >
          <img
            src={story.authorAvatar}
            alt={story.authorName}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-[var(--border-theme,#D5CCC0)] shadow-xs"
          />
          <span className="text-xs font-telugu-serif font-semibold text-[var(--text-main,#1C1917)] group-hover/author:text-[#A44A3F] transition">
            {story.authorName}
          </span>
        </Link>
        <button
          onClick={() => toggleBookmark(story)}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition text-[var(--text-sub,#44403C)] pt-3"
          title={bookmarked ? "బుక్‌మార్క్ తీసివేయండి" : "దాచుకోండి"}
        >
          {bookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-[#A44A3F] fill-current" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </div>
    </article>
  );
}
