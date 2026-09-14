import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, BookOpen, Feather, Users, X } from "lucide-react";
import { wordpressService } from "../services/wordpress";
import { StoryCard } from "../components/cards/StoryCard";
import { PoemCard } from "../components/cards/PoemCard";
import { AuthorCard } from "../components/cards/AuthorCard";
import { SEOHelmet } from "../components/common/SEOHelmet";
import { EmptyState } from "../components/ui/EmptyState";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState("all");
  const [results, setResults] = useState({ posts: [], authors: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function performSearch() {
      if (!initialQuery.trim()) {
        setResults({ posts: [], authors: [] });
        return;
      }

      setLoading(true);
      try {
        const res = await wordpressService.search(initialQuery, {
          type: activeFilter !== "all" && activeFilter !== "authors" ? activeFilter : "all"
        });
        setResults(res);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [initialQuery, activeFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchParams.set("q", query.trim());
      setSearchParams(searchParams);
    } else {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  };

  const storiesCount = results.posts.filter((p) => p.type !== "poem").length;
  const poemsCount = results.posts.filter((p) => p.type === "poem").length;
  const authorsCount = results.authors.length;
  const totalCount = results.posts.length + results.authors.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHelmet
        title={initialQuery ? `"${initialQuery}" కోసం శోధన ఫలితాలు` : "సాహిత్య శోధన"}
        description="కీర్తి కృష్ణ సాహిత్య పత్రికలో కథలు, కవితలు మరియు రచయితలను శోధించండి."
        slug="/search"
      />

      {/* Header & Big Search Input */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-brand tracking-widest text-[#A44A3F] font-bold uppercase">
          సాహిత్య భాండాగారం (Search Archive)
        </span>
        <h1 className="text-3xl sm:text-5xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-[1.35] py-1">
          సాహిత్య శోధన
        </h1>
        <p className="text-sm sm:text-base font-telugu-sans text-[var(--text-sub,#44403C)]">
          కథలు, కవితలు, రచయితలు మరియు భావనలను సులభంగా శోధించండి.
        </p>

        <form onSubmit={handleSubmit} className="relative pt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="కథ, కవిత, రచయిత పేరు లేదా కీలక పదం టైప్ చేయండి..."
            className="w-full pl-12 pr-28 py-4 bg-[var(--bg-content,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl text-base font-telugu-sans shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A44A3F] text-[var(--text-main,#1C1917)] placeholder:text-[var(--text-muted,#78716C)]"
          />
          <Search className="w-5 h-5 text-[var(--text-muted,#78716C)] absolute left-4 top-[calc(50%+8px)] -translate-y-1/2" />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-24 top-[calc(50%+8px)] -translate-y-1/2 text-[var(--text-muted,#57534E)] hover:text-[var(--text-main,#1C1917)] p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-3 top-[calc(50%+8px)] -translate-y-1/2 px-5 py-2.5 bg-[#A44A3F] hover:bg-[#8B3D34] text-white font-telugu-sans text-xs font-semibold rounded-xl transition shadow-xs"
          >
            వెతకండి
          </button>
        </form>
      </div>

      {/* Results Filter Bar */}
      {initialQuery && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-theme,#D5CCC0)] pb-4">
          <div className="text-sm font-telugu-sans text-[var(--text-sub,#44403C)] font-medium">
            <strong>"{initialQuery}"</strong> కోసం మొత్తం <strong className="text-[#A44A3F]">{totalCount}</strong> ఫలితాలు లభించాయి
          </div>

          <div className="flex items-center gap-1.5 bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 p-1 rounded-full text-xs font-telugu-sans">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-full font-semibold transition ${
                activeFilter === "all" ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold shadow-xs border border-stone-200 dark:border-transparent" : "text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
              }`}
            >
              అన్నీ ({totalCount})
            </button>
            <button
              onClick={() => setActiveFilter("story")}
              className={`px-3 py-1.5 rounded-full font-semibold transition ${
                activeFilter === "story" ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold shadow-xs border border-stone-200 dark:border-transparent" : "text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
              }`}
            >
              కథలు ({storiesCount})
            </button>
            <button
              onClick={() => setActiveFilter("poem")}
              className={`px-3 py-1.5 rounded-full font-semibold transition ${
                activeFilter === "poem" ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold shadow-xs border border-stone-200 dark:border-transparent" : "text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
              }`}
            >
              కవితలు ({poemsCount})
            </button>
            <button
              onClick={() => setActiveFilter("authors")}
              className={`px-3 py-1.5 rounded-full font-semibold transition ${
                activeFilter === "authors" ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold shadow-xs border border-stone-200 dark:border-transparent" : "text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
              }`}
            >
              రచయితలు ({authorsCount})
            </button>
          </div>
        </div>
      )}

      {/* Results Rendering */}
      {loading ? (
        <div className="text-center py-16 text-sm font-telugu-sans text-[var(--text-muted,#57534E)]">
          శోధన ఫలితాలు లోడ్ అవుతున్నాయి...
        </div>
      ) : initialQuery && totalCount > 0 ? (
        <div className="space-y-12">
          {/* Authors Section if visible */}
          {(activeFilter === "all" || activeFilter === "authors") && results.authors.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-telugu-serif font-bold text-[var(--text-main,#1C1917)] flex items-center gap-2 leading-normal py-0.5">
                <Users className="w-5 h-5 text-[#A44A3F]" /> రచయితలు ({results.authors.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.authors.map((author) => (
                  <AuthorCard key={author.id} author={author} />
                ))}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {(activeFilter === "all" || activeFilter === "story" || activeFilter === "poem") &&
            results.posts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-telugu-serif font-bold text-[var(--text-main,#1C1917)] flex items-center gap-2 leading-normal py-0.5">
                  <BookOpen className="w-5 h-5 text-[#A44A3F]" /> రచనలు ({results.posts.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.posts.map((post) =>
                    post.type === "poem" ? (
                      <PoemCard key={post.id} poem={post} />
                    ) : (
                      <StoryCard key={post.id} story={post} />
                    )
                  )}
                </div>
              </div>
            )}
        </div>
      ) : initialQuery ? (
        <EmptyState
          icon={Search}
          title="ఫలితాలు ఏవీ లభించలేదు"
          description={`"${initialQuery}" కి సంబంధించిన కథలు, కవితలు లేదా రచయితలు ఏవీ కనిపించలేదు. దయచేసి వేరే పదాలతో ప్రయత్నించండి.`}
          actionText="అన్ని కథలు చూడండి"
          actionLink="/stories"
        />
      ) : (
        <div className="text-center py-20 text-[var(--text-muted,#57534E)] font-telugu-sans text-sm">
          పై సెర్చ్ బార్‌లో పదాలను టైప్ చేసి శోధన ప్రారంభించండి.
        </div>
      )}
    </div>
  );
}
