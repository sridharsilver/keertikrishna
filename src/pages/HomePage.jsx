import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Feather, Sparkles, ArrowRight, Quote, Compass } from "lucide-react";
import { wordpressService } from "../services/wordpress";
import { StoryCard } from "../components/cards/StoryCard";
import { PoemCard } from "../components/cards/PoemCard";
import { AuthorCard } from "../components/cards/AuthorCard";
import { OrnamentDivider } from "../components/ui/OrnamentDivider";
import { SEOHelmet } from "../components/common/SEOHelmet";
import { StoryCardSkeleton, PoemCardSkeleton } from "../components/ui/SkeletonLoader";
import { LITERARY_QUOTES } from "../data/mockData";

export function HomePage() {
  const [heroStory, setHeroStory] = useState(null);
  const [featuredPoem, setFeaturedPoem] = useState(null);
  const [latestStories, setLatestStories] = useState([]);
  const [latestPoems, setLatestPoems] = useState([]);
  const [editorsPick, setEditorsPick] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        const [hero, poem, stories, poems, pick, auths] = await Promise.all([
          wordpressService.getFeaturedStory(),
          wordpressService.getFeaturedPoem(),
          wordpressService.getLatestStories(6),
          wordpressService.getLatestPoems(4),
          wordpressService.getEditorsPick(),
          wordpressService.getAuthors()
        ]);

        setHeroStory(hero);
        setFeaturedPoem(poem);
        setLatestStories(stories);
        setLatestPoems(poems);
        setEditorsPick(pick);
        setAuthors(auths);
      } catch (err) {
        console.error("Failed to load homepage data", err);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  const randomQuote = LITERARY_QUOTES[0];

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      <SEOHelmet
        title="హోమ్"
        description="కీర్తి కృష్ణ - తెలుగు కథలు, కవితలు, వ్యాసాలు మరియు ఆలోచనలతో కూడిన ఆధునిక సాహిత్య వేదిక."
      />

      {/* 1. Hero / Featured Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-brand tracking-widest text-[#A44A3F] font-bold uppercase mb-4">
          <Sparkles className="w-4 h-4" />
          <span>ప్రధాన కథనం</span>
        </div>

        {loading ? (
          <StoryCardSkeleton />
        ) : (
          heroStory && <StoryCard story={heroStory} variant="featured-hero" />
        )}
      </section>

      {/* 2. Featured Poem Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <PoemCardSkeleton />
        ) : (
          featuredPoem && <PoemCard poem={featuredPoem} variant="featured" />
        )}
      </section>

      {/* 3. Literary Quote Interlude */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center my-12">
        <OrnamentDivider text="❦" />
        <div className="relative py-4">
          <Quote className="w-10 h-10 text-[#A44A3F]/30 mx-auto mb-3" />
          <p className="text-xl sm:text-2xl font-telugu-serif italic text-[var(--text-main,#1C1917)] leading-relaxed">
            "{randomQuote.quote}"
          </p>
          <div className="mt-3 text-xs font-telugu-sans text-[var(--text-muted,#57534E)] font-medium">
            — <strong className="text-[var(--text-main,#1C1917)] font-bold">{randomQuote.author}</strong> ({randomQuote.source})
          </div>
        </div>
        <OrnamentDivider text="✦" />
      </section>

      {/* 4. Latest Stories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-theme,#D5CCC0)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-brand tracking-widest text-[#A44A3F] font-bold uppercase">
              <BookOpen className="w-4 h-4" />
              <span>నవీన రచనలు</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-normal mt-1 py-0.5">
              తాజా కథలు & వ్యాసాలు
            </h2>
          </div>
          <Link
            to="/stories"
            className="inline-flex items-center gap-1 text-sm font-telugu-sans text-[#A44A3F] font-bold hover:gap-2 transition-all"
          >
            అన్ని కథలు చూడండి <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StoryCardSkeleton />
            <StoryCardSkeleton />
            <StoryCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Editor's Pick Highlight Banner */}
      {editorsPick && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#2C423B] text-white rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-lg border border-[#3C5A50]">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
            <div className="max-w-3xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-xs font-telugu-sans font-bold text-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>సంపాదకుల ఎంపిక</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-telugu-serif font-black leading-[1.35] py-0.5">
                <Link to={`/${editorsPick.type === "poem" ? "poems" : "stories"}/${editorsPick.slug}`} className="hover:text-amber-200 transition">
                  {editorsPick.title}
                </Link>
              </h3>
              <p className="text-stone-200 font-telugu-sans text-sm sm:text-base leading-relaxed line-clamp-3">
                {editorsPick.excerpt}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <Link
                  to={`/${editorsPick.type === "poem" ? "poems" : "stories"}/${editorsPick.slug}`}
                  className="w-full sm:w-auto text-center px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-900 rounded-full font-telugu-sans text-xs font-bold transition shadow-sm"
                >
                  రచనను చదవండి →
                </Link>
                <span className="text-xs text-stone-200 font-telugu-sans font-medium text-center sm:text-left">
                  రచన: {editorsPick.authorName}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Latest Poems Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-theme,#D5CCC0)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-brand tracking-widest text-[#C07D3E] font-bold uppercase">
              <Feather className="w-4 h-4" />
              <span>కవితా సంకలనం</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-normal mt-1 py-0.5">
              తాజా కవితలు
            </h2>
          </div>
          <Link
            to="/poems"
            className="inline-flex items-center gap-1 text-sm font-telugu-sans text-[#C07D3E] font-bold hover:gap-2 transition-all"
          >
            అన్ని కవితలు చూడండి <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PoemCardSkeleton />
            <PoemCardSkeleton />
            <PoemCardSkeleton />
            <PoemCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestPoems.map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
            ))}
          </div>
        )}
      </section>

      {/* 7. Featured Authors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-theme,#D5CCC0)] pb-4">
          <div>
            <div className="text-xs font-brand tracking-widest text-[#A44A3F] font-bold uppercase">
              సాహితీవేత్తలు
            </div>
            <h2 className="text-2xl sm:text-3xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-normal mt-1 py-0.5">
              ప్రముఖ రచయితలు & కవులు
            </h2>
          </div>
          <Link
            to="/authors"
            className="inline-flex items-center gap-1 text-sm font-telugu-sans text-[#A44A3F] font-bold hover:gap-2 transition-all"
          >
            రచయితలందరినీ చూడండి <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </section>
    </div>
  );
}
