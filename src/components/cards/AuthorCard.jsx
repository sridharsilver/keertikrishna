import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Feather, MapPin } from "lucide-react";

export function AuthorCard({ author }) {
  if (!author) return null;

  return (
    <article className="group bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl p-6 text-center shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-full h-full rounded-full object-cover ring-2 ring-[#A44A3F]/30 group-hover:ring-[#A44A3F] group-hover:scale-105 transition-all duration-300 shadow-sm"
          />
        </div>

        <h3 className="text-xl font-telugu-serif font-bold text-[var(--text-main,#1C1917)] group-hover:text-[#A44A3F] transition-colors leading-normal py-0.5">
          <Link to={`/authors/${author.slug}`}>{author.name}</Link>
        </h3>
        <p className="text-xs text-[#A44A3F] font-telugu-sans font-bold mt-0.5 mb-2">
          {author.role}
        </p>

        {author.location && (
          <div className="flex items-center justify-center gap-1 text-[11px] text-[var(--text-muted,#57534E)] font-telugu-sans font-medium mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#A44A3F]" />
            <span>{author.location}</span>
          </div>
        )}

        <p className="text-xs text-[var(--text-sub,#44403C)] font-telugu-sans leading-relaxed line-clamp-3 px-2">
          {author.bio}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-theme,#D5CCC0)]/80 flex items-center justify-between text-xs text-[var(--text-muted,#57534E)] font-telugu-sans font-medium">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-[var(--text-sub,#44403C)]">
            <BookOpen className="w-3.5 h-3.5 text-[#A44A3F]" />
            {author.stats?.storiesCount || 0} కథలు
          </span>
          <span className="flex items-center gap-1 font-semibold text-[var(--text-sub,#44403C)]">
            <Feather className="w-3.5 h-3.5 text-[#C07D3E]" />
            {author.stats?.poemsCount || 0} కవితలు
          </span>
        </div>
        <Link
          to={`/authors/${author.slug}`}
          className="text-[#A44A3F] font-bold hover:underline"
        >
          పరిచయం →
        </Link>
      </div>
    </article>
  );
}
