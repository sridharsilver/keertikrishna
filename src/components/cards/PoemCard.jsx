import React from "react";
import { Link } from "react-router-dom";
import { Feather, Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "../../contexts/BookmarkContext";

export function PoemCard({ poem, variant = "standard" }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = poem ? isBookmarked(poem.id) : false;

  if (!poem) return null;

  if (variant === "featured") {
    return (
      <div className="relative bg-[var(--bg-content,#FDFBF7)] border-2 border-[var(--border-theme,#D5CCC0)] rounded-3xl p-6 sm:p-10 md:p-12 text-center shadow-md overflow-hidden">
        {/* Background decorative watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#A44A3F]/5 dark:text-white/5 pointer-events-none text-9xl font-serif select-none">
          కవిత
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#C07D3E]/15 text-[#C07D3E] dark:text-[#E8A568] text-xs font-telugu-sans font-bold rounded-full border border-[#C07D3E]/30">
            <Feather className="w-3.5 h-3.5" />
            <span>ప్రత్యేక కవిత (Featured Poem)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-telugu-poetry font-bold text-[var(--text-main,#1C1917)] leading-[1.35] py-0.5">
            <Link to={`/poems/${poem.slug}`} className="hover:text-[#A44A3F] transition-colors">
              {poem.title}
            </Link>
          </h2>

          <div className="font-telugu-poetry text-base sm:text-lg text-[var(--text-main,#2D1F13)] leading-relaxed italic border-y border-[var(--border-theme,#D5CCC0)] py-4 sm:py-6 my-4 sm:my-6 px-2 sm:px-4">
            <p className="line-clamp-4 whitespace-pre-line">
              {poem.content ? poem.content.split("\n\n")[0] : poem.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {poem.tags &&
              poem.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-0.5 bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium rounded-full font-telugu-sans shadow-xs"
                >
                  #{tag}
                </span>
              ))}
          </div>

          {/* Responsive Author & Action Row */}
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between sm:justify-center gap-4">
            <Link
              to={`/authors/${poem.authorSlug}`}
              className="flex items-center gap-2.5 text-sm sm:text-base font-telugu-serif font-bold text-[var(--text-main,#1C1917)] hover:text-[#A44A3F] transition"
            >
              <img
                src={poem.authorAvatar}
                alt={poem.authorName}
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-[#A44A3F] shadow-xs"
              />
              <span className="whitespace-nowrap">— {poem.authorName}</span>
            </Link>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <Link
                to={`/poems/${poem.slug}`}
                className="flex-1 sm:flex-initial text-center px-6 py-2.5 bg-[#A44A3F] hover:bg-[#8B3D34] text-white text-xs sm:text-sm font-telugu-sans font-semibold rounded-full transition shadow-xs"
              >
                కవిత పూర్తిగా చదవండి
              </Link>

              <button
                onClick={() => toggleBookmark(poem)}
                className="p-2.5 rounded-full border border-[var(--border-theme,#D5CCC0)] hover:bg-black/5 dark:hover:bg-white/10 transition text-[var(--text-sub,#44403C)] flex-shrink-0"
                title={bookmarked ? "బుక్‌మార్క్ తీసివేయండి" : "దాచుకోండి"}
              >
                {bookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-[#A44A3F] fill-current" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl p-6 hover:border-[#C07D3E]/70 transition-all duration-300 flex flex-col justify-between relative shadow-xs hover:shadow-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[var(--text-muted,#57534E)]">
          <span className="font-telugu-sans text-[#C07D3E] font-bold flex items-center gap-1">
            <Feather className="w-3 h-3" /> కవిత
          </span>
          <span className="font-literary-sans font-medium">{poem.readTime}</span>
        </div>

        <h3 className="text-2xl font-telugu-poetry font-bold text-[var(--text-main,#1C1917)] group-hover:text-[#A44A3F] transition-colors leading-normal py-0.5">
          <Link to={`/poems/${poem.slug}`}>{poem.title}</Link>
        </h3>

        <div className="font-telugu-poetry text-sm text-[var(--text-sub,#44403C)] leading-relaxed border-l-2 border-[#C07D3E]/40 pl-3 italic line-clamp-3">
          {poem.excerpt}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {poem.tags?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium rounded font-telugu-sans"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-theme,#D5CCC0)]/80 flex items-center justify-between">
        <Link
          to={`/authors/${poem.authorSlug}`}
          className="text-xs font-telugu-serif font-bold text-[var(--text-main,#1C1917)] hover:text-[#A44A3F] transition"
        >
          — {poem.authorName}
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(poem)}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition text-[var(--text-sub,#44403C)]"
            title={bookmarked ? "బుక్‌మార్క్ తీసివేయండి" : "దాచుకోండి"}
          >
            {bookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-[#A44A3F] fill-current" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
          <Link
            to={`/poems/${poem.slug}`}
            className="text-xs font-telugu-sans text-[#A44A3F] font-bold hover:underline"
          >
            చదవండి →
          </Link>
        </div>
      </div>
    </article>
  );
}
