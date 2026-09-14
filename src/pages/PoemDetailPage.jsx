import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Feather, Clock, Calendar, Bookmark, BookmarkCheck, ArrowLeft, ArrowRight, Tag, Heart } from "lucide-react";
import { wordpressService } from "../services/wordpress";
import { useTheme } from "../contexts/ThemeContext";
import { useBookmarks } from "../contexts/BookmarkContext";
import { SEOHelmet } from "../components/common/SEOHelmet";
import { ReaderToolbar } from "../components/reader/ReaderToolbar";
import { ReadingProgressBar } from "../components/common/ReadingProgressBar";
import { OrnamentDivider } from "../components/ui/OrnamentDivider";
import { PoemCard } from "../components/cards/PoemCard";
import { PoemCardSkeleton } from "../components/ui/SkeletonLoader";

export function PoemDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [poem, setPoem] = useState(null);
  const [relatedPoems, setRelatedPoems] = useState([]);
  const [allPoems, setAllPoems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getFontSizeClass, getFontFamilyClass, getLineHeightClass } = useTheme();

  useEffect(() => {
    async function loadPoemData() {
      setLoading(true);
      try {
        const post = await wordpressService.getPostBySlug(slug);
        if (!post) {
          navigate("/poems", { replace: true });
          return;
        }
        setPoem(post);

        const [related, all] = await Promise.all([
          wordpressService.getRelatedPosts(post.id, {
            category: "poems",
            tags: post.tags,
            limit: 3
          }),
          wordpressService.getPosts({ type: "poem", perPage: 20 })
        ]);

        setRelatedPoems(related);
        setAllPoems(all);
      } catch (err) {
        console.error("Failed to load poem", err);
      } finally {
        setLoading(false);
      }
    }

    loadPoemData();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading || !poem) {
    return (
      <div className="py-16 max-w-2xl mx-auto px-4">
        <PoemCardSkeleton />
      </div>
    );
  }

  // Calculate prev and next poems
  const currentIndex = allPoems.findIndex((p) => p.id === poem.id);
  const prevPoem = currentIndex > 0 ? allPoems[currentIndex - 1] : null;
  const nextPoem = currentIndex >= 0 && currentIndex < allPoems.length - 1 ? allPoems[currentIndex + 1] : null;

  return (
    <>
      <SEOHelmet
        title={poem.title}
        description={poem.excerpt}
        image={poem.featuredImage}
        type="article"
        slug={`/poems/${poem.slug}`}
        author={poem.authorName}
        publishedTime={poem.date}
        tags={poem.tags}
      />

      <ReadingProgressBar />

      <main className="py-12">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Top Poem Masthead */}
          <div className="text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C07D3E]/15 text-[#C07D3E] dark:text-[#E8A568] border border-[#C07D3E]/30 rounded-full text-xs font-telugu-sans font-bold">
              <Feather className="w-3.5 h-3.5" />
              <span>కవితా విభాగం</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-telugu-poetry font-bold text-[var(--text-main,#1C1917)] leading-[1.35] sm:leading-[1.3] py-1">
              {poem.title}
            </h1>

            <div className="flex items-center justify-center gap-3 text-xs font-telugu-sans text-[var(--text-muted,#57534E)] font-medium pt-2">
              <Link
                to={`/authors/${poem.authorSlug}`}
                className="flex items-center gap-1.5 text-[var(--text-main,#1C1917)] font-bold hover:text-[#A44A3F] transition"
              >
                <img
                  src={poem.authorAvatar}
                  alt={poem.authorName}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-[#C07D3E] shadow-xs"
                />
                <span>— {poem.authorName}</span>
              </Link>
              <span>•</span>
              <span className="font-literary-sans">{poem.readTime}</span>
            </div>
          </div>

          {/* Reader Toolbar */}
          <ReaderToolbar post={poem} />

          {/* Poem Reading Box (Dedicated poetic spacing) */}
          <div className="bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-3xl p-8 sm:p-14 my-10 shadow-sm text-center max-w-xl mx-auto">
            <div
              className={`poem-body text-[var(--text-main,#1C1917)] ${getFontSizeClass()} ${getFontFamilyClass()} ${getLineHeightClass()}`}
            >
              {poem.content.split("\n\n").map((stanza, idx) => (
                <p key={idx} className="whitespace-pre-line my-6">
                  {stanza}
                </p>
              ))}
            </div>

            <OrnamentDivider text="✦" className="my-8" />

            <div className="text-xs font-telugu-serif italic text-[var(--text-muted,#57534E)] font-semibold">
              ~ {poem.authorName}
            </div>
          </div>

          {/* Tags */}
          {poem.tags && poem.tags.length > 0 && (
            <div className="max-w-xl mx-auto flex flex-wrap items-center justify-center gap-2 my-8">
              {poem.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  to={`/poems?tag=${encodeURIComponent(tag)}`}
                  className="text-xs px-3 py-1 bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium rounded-full font-telugu-sans hover:bg-[#C07D3E] hover:text-white transition shadow-xs"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Author Footnote */}
          <div className="max-w-xl mx-auto bg-[var(--bg-content,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl p-5 flex items-center justify-between gap-4 my-8 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src={poem.authorAvatar}
                alt={poem.authorName}
                className="w-12 h-12 rounded-full object-cover ring-1 ring-[#C07D3E] shadow-xs"
              />
              <div>
                <h4 className="text-base font-telugu-serif font-bold text-[var(--text-main,#1C1917)]">
                  {poem.authorName}
                </h4>
                <span className="text-xs text-[var(--text-muted,#57534E)] font-telugu-sans font-medium">
                  కవి & రచయిత
                </span>
              </div>
            </div>
            <Link
              to={`/authors/${poem.authorSlug}`}
              className="text-xs font-telugu-sans text-[#A44A3F] font-bold hover:underline"
            >
              ఇతర రచనలు →
            </Link>
          </div>

          {/* Prev / Next Poem */}
          <div className="max-w-xl mx-auto grid grid-cols-2 gap-4 my-8">
            {prevPoem ? (
              <Link
                to={`/poems/${prevPoem.slug}`}
                className="p-3 bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-xl hover:border-[#C07D3E] transition text-left shadow-xs"
              >
                <span className="text-[10px] text-[var(--text-muted,#57534E)] font-telugu-sans font-medium block">
                  ← మునుపటి కవిత
                </span>
                <span className="text-xs font-telugu-poetry font-bold text-[var(--text-main,#1C1917)] line-clamp-2 leading-snug py-0.5">
                  {prevPoem.title}
                </span>
              </Link>
            ) : <div />}

            {nextPoem ? (
              <Link
                to={`/poems/${nextPoem.slug}`}
                className="p-3 bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-xl hover:border-[#C07D3E] transition text-right shadow-xs"
              >
                <span className="text-[10px] text-[var(--text-muted,#57534E)] font-telugu-sans font-medium block">
                  తర్వాతి కవిత →
                </span>
                <span className="text-xs font-telugu-poetry font-bold text-[var(--text-main,#1C1917)] line-clamp-2 leading-snug py-0.5">
                  {nextPoem.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          {/* Related Poems */}
          {relatedPoems.length > 0 && (
            <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-[var(--border-theme,#D5CCC0)] space-y-6">
              <h3 className="text-2xl font-telugu-poetry font-bold text-[var(--text-main,#1C1917)] text-center leading-normal py-0.5">
                ఇతర అనుబంధ కవితలు
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPoems.map((rel) => (
                  <PoemCard key={rel.id} poem={rel} />
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  );
}
