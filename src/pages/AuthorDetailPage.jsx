import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Mail, Globe, BookOpen, Feather, ArrowLeft } from "lucide-react";
import { wordpressService } from "../services/wordpress";
import { StoryCard } from "../components/cards/StoryCard";
import { PoemCard } from "../components/cards/PoemCard";
import { SEOHelmet } from "../components/common/SEOHelmet";
import { EmptyState } from "../components/ui/EmptyState";

export function AuthorDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [works, setWorks] = useState({ stories: [], poems: [], essays: [], reflections: [], totalCount: 0 });
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthorData() {
      setLoading(true);
      try {
        const auth = await wordpressService.getAuthorBySlug(slug);
        if (!auth) {
          navigate("/authors", { replace: true });
          return;
        }
        setAuthor(auth);

        const authorWorks = await wordpressService.getAuthorWorks(slug);
        setWorks(authorWorks);
      } catch (err) {
        console.error("Failed to load author details", err);
      } finally {
        setLoading(false);
      }
    }

    loadAuthorData();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading || !author) {
    return (
      <div className="py-20 text-center text-sm font-telugu-sans text-stone-500">
        రచయిత వివరాలు లోడ్ అవుతున్నాయి...
      </div>
    );
  }

  const allWorks = [...works.stories, ...works.poems, ...works.essays, ...works.reflections];

  return (
    <div className="space-y-12 py-6">
      <SEOHelmet
        title={`${author.name} - రచయిత పరిచయం`}
        description={author.bio}
        image={author.avatar}
        slug={`/authors/${author.slug}`}
      />

      {/* Header Banner */}
      <div className="relative">
        <div className="h-56 sm:h-72 w-full overflow-hidden bg-stone-900">
          <img
            src={author.coverImage}
            alt={author.name}
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Profile Card Overlay */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10">
          <div className="bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover ring-4 ring-white dark:ring-stone-800 shadow-md shrink-0"
            />

            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-[1.35] py-0.5">
                    {author.name}
                  </h1>
                  <p className="text-sm font-telugu-sans text-[#A44A3F] font-bold mt-0.5">
                    {author.role}
                  </p>
                </div>

                {/* Social & Contact Links */}
                <div className="flex items-center justify-center md:justify-end gap-2 pt-2 md:pt-0">
                  {author.social?.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-[#A44A3F] hover:text-white transition text-stone-800 dark:text-stone-200"
                      title="వెబ్‌సైట్ / సోషల్ మీడియా"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {author.social?.email && (
                    <a
                      href={`mailto:${author.social.email}`}
                      className="p-2 rounded-full bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-[#A44A3F] hover:text-white transition text-stone-800 dark:text-stone-200"
                      title="ఈమెయిల్ సంప్రదింపులు"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {author.location && (
                <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-[var(--text-muted,#57534E)] font-telugu-sans font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#A44A3F]" />
                  <span>{author.location}</span>
                </div>
              )}

              <p className="text-sm sm:text-base text-[var(--text-sub,#44403C)] font-telugu-sans leading-relaxed pt-2">
                {author.bio}
              </p>

              {/* Works Count Stats */}
              <div className="pt-4 border-t border-[var(--border-theme,#D5CCC0)] flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs font-telugu-sans text-[var(--text-sub,#44403C)]">
                <span className="flex items-center gap-1.5 font-bold text-[var(--text-main,#1C1917)]">
                  <BookOpen className="w-4 h-4 text-[#A44A3F]" />
                  {works.stories.length} కథలు
                </span>
                <span className="flex items-center gap-1.5 font-bold text-[var(--text-main,#1C1917)]">
                  <Feather className="w-4 h-4 text-[#C07D3E]" />
                  {works.poems.length} కవితలు
                </span>
                <span className="text-[var(--text-muted,#57534E)] font-medium">
                  మొత్తం రచనలు: {works.totalCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author's Works Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[var(--border-theme,#D5CCC0)] pb-4">
          <h2 className="text-2xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-normal py-0.5">
            {author.name} రచనలు
          </h2>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 p-1 rounded-full text-xs font-telugu-sans">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === "all" ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold shadow-xs border border-stone-200 dark:border-transparent" : "text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
              }`}
            >
              అన్నీ ({works.totalCount})
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === "stories" ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold shadow-xs border border-stone-200 dark:border-transparent" : "text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
              }`}
            >
              కథలు ({works.stories.length})
            </button>
            <button
              onClick={() => setActiveTab("poems")}
              className={`px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === "poems" ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold shadow-xs border border-stone-200 dark:border-transparent" : "text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
              }`}
            >
              కవితలు ({works.poems.length})
            </button>
          </div>
        </div>

        {/* Content list */}
        {activeTab === "all" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allWorks.map((work) =>
              work.type === "poem" ? (
                <PoemCard key={work.id} poem={work} />
              ) : (
                <StoryCard key={work.id} story={work} />
              )
            )}
          </div>
        )}

        {activeTab === "stories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}

        {activeTab === "poems" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.poems.map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
            ))}
          </div>
        )}

        {allWorks.length === 0 && (
          <EmptyState
            title="రచనలు లేవు"
            description="ఈ రచయిత నుండి ప్రస్తుతానికి రచనలేవీ అందుబాటులో లేవు."
          />
        )}
      </section>
    </div>
  );
}
