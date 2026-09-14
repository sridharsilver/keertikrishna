import React, { useState, useEffect } from "react";
import { Users, Feather, BookOpen, Search } from "lucide-react";
import { wordpressService } from "../services/wordpress";
import { AuthorCard } from "../components/cards/AuthorCard";
import { SEOHelmet } from "../components/common/SEOHelmet";
import { EmptyState } from "../components/ui/EmptyState";

export function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthors() {
      setLoading(true);
      try {
        const auths = await wordpressService.getAuthors();
        setAuthors(auths);
      } catch (err) {
        console.error("Failed to load authors", err);
      } finally {
        setLoading(false);
      }
    }
    loadAuthors();
  }, []);

  const filteredAuthors = authors.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SEOHelmet
        title="రచయితలు & కవులు"
        description="కీర్తి కృష్ణ సాహిత్య పత్రికకు రచనలు అందించిన ప్రతిభావంతులైన రచయితలు, కవులు మరియు సాహితీ విమర్శకులు."
        slug="/authors"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-brand tracking-widest text-[#A44A3F] font-bold uppercase flex items-center justify-center gap-1.5">
          <Users className="w-4 h-4" /> సాహితీ సృష్టికర్తలు (Literary Contributors)
        </span>
        <h1 className="text-3xl sm:text-5xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-[1.35] py-1">
          రచయితలు & కవులు
        </h1>
        <p className="text-[var(--text-sub,#44403C)] font-telugu-sans text-sm sm:text-base leading-relaxed">
          తెలుగు భాషా సౌందర్యాన్ని, జీవన వేదనలను అక్షరాల రూపంలో ఆవిష్కరిస్తున్న మా రచయితల బృందం.
        </p>

        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[var(--text-muted,#78716C)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="రచయిత పేరుతో వెతకండి..."
            className="w-full pl-10 pr-4 py-2.5 text-xs font-telugu-sans bg-[var(--bg-content,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] text-[var(--text-main,#1C1917)] placeholder:text-[var(--text-muted,#78716C)] rounded-full focus:outline-none focus:ring-2 focus:ring-[#A44A3F] shadow-xs"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-sm text-stone-500 font-telugu-sans">
          రచయితల వివరాలు లోడ్ అవుతున్నాయి...
        </div>
      ) : filteredAuthors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAuthors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="రచయితలు కనుగొనబడలేదు"
          description="మీరు వెతికిన పేరుతో రచయితలెవరూ లేరు."
          actionText="అందరినీ చూపించు"
          actionLink="/authors"
        />
      )}
    </div>
  );
}
