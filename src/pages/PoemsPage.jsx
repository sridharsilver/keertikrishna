import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Feather, Tag, Search } from "lucide-react";
import { wordpressService } from "../services/wordpress";
import { PoemCard } from "../components/cards/PoemCard";
import { SEOHelmet } from "../components/common/SEOHelmet";
import { PoemCardSkeleton } from "../components/ui/SkeletonLoader";
import { EmptyState } from "../components/ui/EmptyState";

export function PoemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTag = searchParams.get("tag") || "";

  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [searchQuery, setSearchQuery] = useState("");
  const [poems, setPoems] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTags() {
      const tgs = await wordpressService.getTags();
      setTags(tgs);
    }
    loadTags();
  }, []);

  useEffect(() => {
    async function loadPoems() {
      setLoading(true);
      try {
        const posts = await wordpressService.getPosts({
          type: "poem",
          tag: selectedTag || undefined,
          search: searchQuery || undefined,
          perPage: 30
        });
        setPoems(posts);
      } catch (err) {
        console.error("Failed to load poems", err);
      } finally {
        setLoading(false);
      }
    }

    loadPoems();
  }, [selectedTag, searchQuery]);

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
        title="తెలుగు కవితా సంకలనం"
        description="అంతరంగ మధనం, ప్రకృతి రమణీయత, ప్రేమ మరియు తాత్విక భావాలతో నిండిన తెలుగు కవితలు."
        slug="/poems"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-brand tracking-widest text-[#C07D3E] font-bold uppercase flex items-center justify-center gap-1.5">
          <Feather className="w-4 h-4" /> కవితా లహరి (Poetry Archives)
        </span>
        <h1 className="text-3xl sm:text-5xl font-telugu-poetry font-bold text-[var(--text-main,#1C1917)] leading-[1.35] py-1">
          తెలుగు కవితా సంకలనం
        </h1>
        <p className="text-[var(--text-sub,#44403C)] font-telugu-sans text-sm sm:text-base leading-relaxed">
          పదాల లయలో ప్రాణం పోసుకున్న భావోద్వేగాలు, మౌనాన్ని పలికించే ఆధునిక వచన కవిత్వం.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[var(--text-muted,#57534E)] font-telugu-sans font-medium flex items-center gap-1 mr-1">
              <Tag className="w-3.5 h-3.5 text-[#C07D3E]" /> కవితా భావం (Emotion/Theme):
            </span>
            {tags.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTagToggle(t.name)}
                className={`text-xs px-3 py-1 rounded-full font-telugu-sans font-medium transition ${
                  selectedTag === t.name
                    ? "bg-[#C07D3E] text-white font-bold shadow-xs"
                    : "bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-[#C07D3E] hover:text-white"
                }`}
              >
                #{t.name}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-[var(--text-muted,#78716C)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="కవితల్లో వెతకండి..."
              className="w-full pl-9 pr-4 py-2 text-xs font-telugu-sans bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] text-[var(--text-main,#1C1917)] placeholder:text-[var(--text-muted,#78716C)] rounded-full focus:outline-none focus:ring-2 focus:ring-[#C07D3E]"
            />
          </div>
        </div>
      </div>

      {/* Poems Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PoemCardSkeleton />
          <PoemCardSkeleton />
          <PoemCardSkeleton />
        </div>
      ) : poems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Feather}
          title="కవితలు ఏవీ కనుగొనబడలేదు"
          description="మీరు వెతుకుతున్న అంశానికి సంబంధించిన కవితలు లభించలేదు."
          actionText="అన్ని కవితలు చూడండి"
          actionLink="/poems"
        />
      )}
    </div>
  );
}
