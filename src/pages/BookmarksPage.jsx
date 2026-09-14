import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, Trash2, BookOpen, Clock, ArrowRight } from "lucide-react";
import { useBookmarks } from "../contexts/BookmarkContext";
import { SEOHelmet } from "../components/common/SEOHelmet";
import { EmptyState } from "../components/ui/EmptyState";

export function BookmarksPage() {
  const { bookmarks, removeBookmark, clearAllBookmarks } = useBookmarks();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHelmet
        title="రీడింగ్ లిస్ట్ & బుక్‌మార్క్‌లు"
        description="మీరు తర్వాత చదవడానికి భద్రపరుచుకున్న తెలుగు కథలు మరియు కవితల వ్యక్తిగత జాబితా."
        slug="/bookmarks"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-theme,#D5CCC0)] pb-6">
        <div>
          <span className="text-xs font-brand tracking-widest text-[#A44A3F] font-bold uppercase flex items-center gap-1.5">
            <Bookmark className="w-4 h-4" /> మీ వ్యక్తిగత రీడింగ్ లిస్ట్ (Reading List)
          </span>
          <h1 className="text-3xl sm:text-4xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-[1.35] mt-1 py-0.5">
            దాచుకున్న రచనలు ({bookmarks.length})
          </h1>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={clearAllBookmarks}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted,#57534E)] hover:text-rose-600 transition font-telugu-sans font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>అన్నీ తొలగించండి (Clear All)</span>
          </button>
        )}
      </div>

      {/* Bookmarked Items List */}
      {bookmarks.length > 0 ? (
        <div className="space-y-4">
          {bookmarks.map((item) => (
            <div
              key={item.id}
              className="group bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl p-5 sm:p-6 shadow-xs hover:border-[#A44A3F] transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4 flex-1">
                {item.featuredImage && (
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover ring-1 ring-[var(--border-theme,#D5CCC0)] shrink-0 shadow-xs"
                  />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted,#57534E)] font-telugu-sans font-medium">
                    <span className="px-2 py-0.5 bg-[#A44A3F]/15 text-[#A44A3F] rounded font-bold text-[10px]">
                      {item.type === "poem" ? "కవిత" : "కథ"}
                    </span>
                    <span>•</span>
                    <span>{item.authorName}</span>
                    <span>•</span>
                    <span className="font-literary-sans">{item.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-telugu-serif font-bold text-[var(--text-main,#1C1917)] group-hover:text-[#A44A3F] transition leading-normal py-0.5">
                    <Link to={`/${item.type === "poem" ? "poems" : "stories"}/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-[var(--text-sub,#44403C)] font-telugu-sans line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--border-theme,#D5CCC0)]">
                <button
                  onClick={() => removeBookmark(item.id)}
                  className="p-2 text-[var(--text-muted,#57534E)] hover:text-rose-600 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition"
                  title="తొలగించండి"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <Link
                  to={`/${item.type === "poem" ? "poems" : "stories"}/${item.slug}`}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-[#A44A3F] hover:bg-[#8B3D34] text-white text-xs font-telugu-sans font-semibold rounded-full transition shadow-xs"
                >
                  <span>చదవండి</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="రీడింగ్ లిస్ట్ ఖాళీగా ఉంది"
          description="మీరు కథలు లేదా కవితలు చదువుతున్నప్పుడు బుక్‌మార్క్ చిహ్నంపై క్లిక్ చేసి వాటిని ఇక్కడ భద్రపరుచుకోవచ్చు."
          actionText="కథలను అన్వేషించండి"
          actionLink="/stories"
        />
      )}
    </div>
  );
}
