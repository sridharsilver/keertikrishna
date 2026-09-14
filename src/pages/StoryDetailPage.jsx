import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, Calendar, Bookmark, BookmarkCheck, ArrowLeft, ArrowRight, Share2, Tag, BookOpen } from "lucide-react";
import { wordpressService } from "../services/wordpress";
import { useTheme } from "../contexts/ThemeContext";
import { useBookmarks } from "../contexts/BookmarkContext";
import { SEOHelmet } from "../components/common/SEOHelmet";
import { ReaderToolbar } from "../components/reader/ReaderToolbar";
import { ReadingProgressBar } from "../components/common/ReadingProgressBar";
import { OrnamentDivider } from "../components/ui/OrnamentDivider";
import { StoryCard } from "../components/cards/StoryCard";
import { StoryDetailSkeleton } from "../components/ui/SkeletonLoader";

export function StoryDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [relatedStories, setRelatedStories] = useState([]);
  const [allStories, setAllStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getFontSizeClass, getFontFamilyClass, getLineHeightClass } = useTheme();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    async function loadStoryData() {
      setLoading(true);
      try {
        const post = await wordpressService.getPostBySlug(slug);
        if (!post) {
          navigate("/stories", { replace: true });
          return;
        }
        setStory(post);

        const [related, all] = await Promise.all([
          wordpressService.getRelatedPosts(post.id, {
            category: post.category,
            tags: post.tags,
            limit: 3
          }),
          wordpressService.getPosts({ type: "story", perPage: 20 })
        ]);

        setRelatedStories(related);
        setAllStories(all);
      } catch (err) {
        console.error("Failed to load story", err);
      } finally {
        setLoading(false);
      }
    }

    loadStoryData();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading || !story) {
    return (
      <div className="py-12">
        <StoryDetailSkeleton />
      </div>
    );
  }

  // Calculate prev and next stories
  const currentIndex = allStories.findIndex((s) => s.id === story.id);
  const prevStory = currentIndex > 0 ? allStories[currentIndex - 1] : null;
  const nextStory = currentIndex >= 0 && currentIndex < allStories.length - 1 ? allStories[currentIndex + 1] : null;

  return (
    <>
      <SEOHelmet
        title={story.title}
        description={story.excerpt}
        image={story.featuredImage}
        type="article"
        slug={`/stories/${story.slug}`}
        author={story.authorName}
        publishedTime={story.date}
        tags={story.tags}
      />

      <ReadingProgressBar />

      <main className="py-8">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb / Category */}
          <div className="text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2">
              <Link
                to="/stories"
                className="text-xs font-brand tracking-widest text-[#A44A3F] font-bold uppercase hover:underline"
              >
                {story.categoryName || "కథ"}
              </Link>
            </div>

            {/* Editorial Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-[1.35] sm:leading-[1.3] py-1">
              {story.title}
            </h1>

            {/* Excerpt Lead */}
            <p className="text-base sm:text-xl text-[var(--text-sub,#44403C)] font-telugu-serif italic leading-relaxed max-w-2xl mx-auto pt-2">
              {story.excerpt}
            </p>

            {/* Author Byline & Metadata */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-telugu-sans text-[var(--text-muted,#57534E)] font-medium pt-4 border-y border-[var(--border-theme,#D5CCC0)] py-3">
              <Link
                to={`/authors/${story.authorSlug}`}
                className="flex items-center gap-2 text-[var(--text-main,#1C1917)] font-bold hover:text-[#A44A3F] transition"
              >
                <img
                  src={story.authorAvatar}
                  alt={story.authorName}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-[#A44A3F] shadow-xs"
                />
                <span>{story.authorName}</span>
              </Link>
              <span>•</span>
              <span className="flex items-center gap-1 font-literary-sans">
                <Calendar className="w-3.5 h-3.5 text-[#A44A3F]" />
                {story.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-literary-sans">
                <Clock className="w-3.5 h-3.5 text-[#A44A3F]" />
                {story.readTime}
              </span>
            </div>
          </div>

          {/* Reader Controls Toolbar */}
          <ReaderToolbar post={story} />

          {/* Featured Hero Image */}
          {story.featuredImage && (
            <div className="my-8 rounded-2xl overflow-hidden shadow-sm aspect-[16/9] bg-stone-100 border border-[var(--border-theme,#D5CCC0)]">
              <img
                src={story.featuredImage}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Longform Story Content */}
          <div
            className={`story-body max-w-3xl mx-auto my-12 text-[var(--text-main,#1C1917)] ${getFontSizeClass()} ${getFontFamilyClass()} ${getLineHeightClass()}`}
          >
            {story.content.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <OrnamentDivider text="❦" />

          {/* Literary Tags Section */}
          {story.tags && story.tags.length > 0 && (
            <div className="max-w-3xl mx-auto flex flex-wrap items-center gap-2 my-8">
              <span className="text-xs text-[var(--text-muted,#57534E)] font-telugu-sans font-medium flex items-center gap-1 mr-1">
                <Tag className="w-3.5 h-3.5 text-[#A44A3F]" /> ట్యాగ్‌లు:
              </span>
              {story.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  to={`/stories?tag=${encodeURIComponent(tag)}`}
                  className="text-xs px-3 py-1 bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium rounded-full font-telugu-sans hover:bg-[#A44A3F] hover:text-white transition shadow-xs"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Author Box */}
          <div className="max-w-3xl mx-auto bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl p-6 sm:p-8 my-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
            <img
              src={story.authorAvatar}
              alt={story.authorName}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-[#A44A3F]/50 shrink-0 shadow-sm"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-xl font-telugu-serif font-bold text-[var(--text-main,#1C1917)]">
                    {story.authorName}
                  </h3>
                  <span className="text-xs text-[#A44A3F] font-telugu-sans font-bold">
                    రచయిత / రచయిత్రి
                  </span>
                </div>
                <Link
                  to={`/authors/${story.authorSlug}`}
                  className="text-xs font-telugu-sans text-[#A44A3F] font-bold hover:underline"
                >
                  రచయిత పూర్తి వివరాలు →
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-sub,#44403C)] font-telugu-sans leading-relaxed">
                తెలుగు సాహిత్యంలో మానవ సంబంధాల సున్నితత్వాలను, అంతరంగ భావోద్వేగాలను అక్షరబద్ధం చేసే రచయితల బృందంలో ఒకరు.
              </p>
            </div>
          </div>

          {/* Next / Previous Story Navigation */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 pt-6 border-t border-[var(--border-theme,#D5CCC0)]">
            {prevStory ? (
              <Link
                to={`/stories/${prevStory.slug}`}
                className="group p-4 bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-xl hover:border-[#A44A3F] transition text-left shadow-xs"
              >
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted,#57534E)] font-telugu-sans font-medium mb-1">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition text-[#A44A3F]" />
                  <span>మునుపటి కథ</span>
                </div>
                <h4 className="text-base font-telugu-serif font-bold text-[var(--text-main,#1C1917)] group-hover:text-[#A44A3F] transition line-clamp-2 leading-snug py-0.5">
                  {prevStory.title}
                </h4>
              </Link>
            ) : <div />}

            {nextStory ? (
              <Link
                to={`/stories/${nextStory.slug}`}
                className="group p-4 bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-xl hover:border-[#A44A3F] transition text-right shadow-xs"
              >
                <div className="flex items-center justify-end gap-1.5 text-xs text-[var(--text-muted,#57534E)] font-telugu-sans font-medium mb-1">
                  <span>తర్వాతి కథ</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition text-[#A44A3F]" />
                </div>
                <h4 className="text-base font-telugu-serif font-bold text-[var(--text-main,#1C1917)] group-hover:text-[#A44A3F] transition line-clamp-2 leading-snug py-0.5">
                  {nextStory.title}
                </h4>
              </Link>
            ) : <div />}
          </div>

          {/* Related Stories */}
          {relatedStories.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16 pt-10 border-t border-[var(--border-theme,#D5CCC0)] space-y-6">
              <h3 className="text-2xl font-telugu-serif font-bold text-[var(--text-main,#1C1917)] leading-normal py-0.5">
                సంబంధిత ఇతర రచనలు
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedStories.map((rel) => (
                  <StoryCard key={rel.id} story={rel} />
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  );
}
