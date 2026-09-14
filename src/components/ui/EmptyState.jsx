import React from "react";
import { BookOpen, Search } from "lucide-react";
import { Link } from "react-router-dom";

export function EmptyState({
  icon: Icon = BookOpen,
  title = "రచనలు ఏవీ కనుగొనబడలేదు",
  description = "మీరు వెతుకుతున్న విభాగంలో ప్రస్తుతానికి రచనలు అందుబాటులో లేవు.",
  actionText = "హోమ్‌కి తిరిగి వెళ్ళండి",
  actionLink = "/"
}) {
  return (
    <div className="py-20 px-6 text-center max-w-md mx-auto">
      <div className="w-16 h-16 bg-[#A44A3F]/10 text-[#A44A3F] rounded-full flex items-center justify-center mx-auto mb-5">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-telugu-serif font-bold text-[var(--text-main,#1C1917)] mb-3 leading-normal py-0.5">
        {title}
      </h3>
      <p className="text-[var(--text-sub,#44403C)] font-telugu-sans text-sm md:text-base leading-relaxed mb-6">
        {description}
      </p>
      {actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#A44A3F] text-white rounded-full font-telugu-sans text-sm hover:bg-[#8B3D34] transition shadow-sm"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
