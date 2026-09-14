import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpen, Filter, Search, Tag } from "lucide-react";
import { wordpressService } from "../services/wordpress";
import { StoryCard } from "../components/cards/StoryCard";
import { SEOHelmet } from "../components/common/SEOHelmet";
import { StoryCardSkeleton } from "../components/ui/SkeletonLoader";
import { EmptyState } from "../components/ui/EmptyState";

export function StoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";
  const initialTag = searchParams.get("tag") || "";

  const [category, setCategory] = useState(initialCategory);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [searchQuery, setSearchQuery] = useState("");
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeta() {
      const [cats, tgs] = await Promise.all([
        wordpressService.getCategories(),
        wordpressService.getTags()
      ]);
      setCategories(cats.filter((c) => c.slug !== "poems"));
      setTags(tgs);
    }
    loadMeta();
  }, []);

  useEffect(() => {
    async function loadStories() {
      setLoading(true);
      try {
        const posts = await wordpressService.getPosts({
          category: category !== "all" ? category : undefined,
          tag: selectedTag || undefined,
          search: searchQuery || undefined,
          perPage: 30
        });

        // Filter out pure poems from this page unless selected
        const nonPoemPosts = posts.filter((p) => p.type !== "poem");
        setStories(nonPoemPosts);
      } catch (err) {
        console.error("Failed to load stories", err);
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, [category, selectedTag, searchQuery]);

  const handleCategoryChange = (slug) => {
    setCategory(slug);
    if (slug === "all") {
      searchParams.delete("cat");
    } else {
      searchParams.set("cat", slug);
    }
    setSearchParams(searchParams);
  };

  const handleTagToggle = (tagName) => {
    if (selectedTag === tagName) {
      setSelectedTag("");
      searchParams.delete("tag");
    } else {
      setSelectedTag(tagName);
      searchParams.set("tag", tagName);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SEOHelmet
        title="తెలుగు కథలు & వ్యాసాలు"
        description="జీవన అనుభవాలు, మానవ సంబంధాలు మరియు గ్రామీణ-పట్టణ కథనాలతో కూడిన తెలుగు కథల సంకలనం."
        slug="/stories"
      />

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-brand tracking-widest text-[#A44A3F] font-bold uppercase">
          కథా సంపుటి (Story Archives)
        </span>
        <h1 className="text-3xl sm:text-5xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-[1.35] py-1">
          తెలుగు కథలు & వ్యాసాలు
        </h1>
        <p className="text-[var(--text-sub,#44403C)] font-telugu-sans text-sm sm:text-base leading-relaxed">
          హృదయాన్ని తాకే భావోద్వేగాలు, జీవన చిత్రణలు మరియు ఆలోచనాత్మకమైన వ్యాసాల నిధి.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full font-telugu-sans text-xs sm:text-sm font-semibold transition ${
                category === "all"
                  ? "bg-[#A44A3F] text-white shadow-xs font-bold"
                  : "bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:border-[#A44A3F]"
              }`}
            >
              అన్నీ (All)
            </button>
            <button
              onClick={() => handleCategoryChange("stories")}
              className={`px-4 py-2 rounded-full font-telugu-sans text-xs sm:text-sm font-semibold transition ${
                category === "stories"
                  ? "bg-[#A44A3F] text-white shadow-xs font-bold"
                  : "bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:border-[#A44A3F]"
              }`}
            >
              కథలు (Stories)
            </button>
            <button
              onClick={() => handleCategoryChange("essays")}
              className={`px-4 py-2 rounded-full font-telugu-sans text-xs sm:text-sm font-semibold transition ${
                category === "essays"
                  ? "bg-[#A44A3F] text-white shadow-xs font-bold"
                  : "bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:border-[#A44A3F]"
              }`}
            >
              వ్యాసాలు (Essays)
            </button>
            <button
              onClick={() => handleCategoryChange("reflections")}
              className={`px-4 py-2 rounded-full font-telugu-sans text-xs sm:text-sm font-semibold transition ${
                category === "reflections"
                  ? "bg-[#A44A3F] text-white shadow-xs font-bold"
                  : "bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:border-[#A44A3F]"
              }`}
            >
              ఆలోచనలు (Reflections)
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-[var(--text-muted,#78716C)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="కథల్లో వెతకండి..."
              className="w-full pl-9 pr-4 py-2 text-xs font-telugu-sans bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] text-[var(--text-main,#1C1917)] placeholder:text-[var(--text-muted,#78716C)] rounded-full focus:outline-none focus:ring-2 focus:ring-[#A44A3F]"
            />
          </div>
        </div>

        {/* Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[var(--border-theme,#D5CCC0)]/80">
          <span className="text-xs text-[var(--text-muted,#57534E)] font-telugu-sans font-medium flex items-center gap-1 mr-1">
            <Tag className="w-3.5 h-3.5 text-[#A44A3F]" /> సాహితీ ట్యాగ్‌లు:
          </span>
          {tags.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTagToggle(t.name)}
              className={`text-xs px-3 py-1 rounded-full font-telugu-sans font-medium transition ${
                selectedTag === t.name
                  ? "bg-[#C07D3E] text-white font-bold shadow-xs"
                  : "bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-[#A44A3F] hover:text-white"
              }`}
            >
              #{t.name}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => {
                setSelectedTag("");
                searchParams.delete("tag");
                setSearchParams(searchParams);
              }}
              className="text-xs text-[#A44A3F] font-telugu-sans font-bold ml-2 underline"
            >
              ఫిల్టర్ తీసివేయండి
            </button>
          )}
        </div>
      </div>

      {/* Stories Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StoryCardSkeleton />
          <StoryCardSkeleton />
          <StoryCardSkeleton />
        </div>
      ) : stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="కథలు ఏవీ కనుగొనబడలేదు"
          description="మీరు ఎంచుకున్న విభాగం లేదా శోధన పదానికి సరిపోయే రచనలు లభించలేదు."
          actionText="అన్ని కథలను చూపించు"
          actionLink="/stories"
        />
      )}
    </div>
  );
}
