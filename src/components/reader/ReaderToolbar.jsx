import React, { useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Share2,
  Type,
  Sun,
  Moon,
  Printer,
  Check,
  Copy,
  Sliders
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useBookmarks } from "../../contexts/BookmarkContext";

export function ReaderToolbar({ post }) {
  const {
    readingTheme,
    setReadingTheme,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    fontFamily,
    setFontFamily
  } = useTheme();

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const bookmarked = post ? isBookmarked(post.id) : false;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${post.title}" - కీర్తి కృష్ణ తెలుగు సాహిత్య పత్రికలో చదవండి.`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`*${post.title}*\n${post.excerpt}\n\nపూర్తిగా చదవండి: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Floating Reader Controls */}
      <aside aria-label="Reading Controls" className="sticky top-20 z-40 bg-[var(--bg-toolbar,#FBF8F3)] backdrop-blur-md border border-[var(--border-theme,#D5CCC0)] rounded-full px-4 py-2.5 my-6 shadow-md flex items-center justify-between gap-2.5 max-w-xl mx-auto transition-reading text-[var(--text-main,#1C1917)]">
        {/* Theme Selectors */}
        <div className="flex items-center gap-2" title="రీడింగ్ థీమ్ (Reading Theme)">
          <button
            onClick={() => setReadingTheme("parchment")}
            className={`w-6 h-6 rounded-full border transition-all ${
              readingTheme === "parchment" ? "scale-110 ring-2 ring-[#A44A3F] border-transparent shadow-xs" : "border-stone-400 hover:scale-105"
            } bg-[#FBF8F3]`}
            title="పాత కాగితం (Parchment)"
            aria-label="Parchment Theme"
          />
          <button
            onClick={() => setReadingTheme("sepia")}
            className={`w-6 h-6 rounded-full border transition-all ${
              readingTheme === "sepia" ? "scale-110 ring-2 ring-[#A44A3F] border-transparent shadow-xs" : "border-amber-600 hover:scale-105"
            } bg-[#F4ECD8]`}
            title="సెపియా (Sepia)"
            aria-label="Sepia Theme"
          />
          <button
            onClick={() => setReadingTheme("white")}
            className={`w-6 h-6 rounded-full border transition-all ${
              readingTheme === "white" ? "scale-110 ring-2 ring-[#A44A3F] border-transparent shadow-xs" : "border-stone-400 ring-1 ring-stone-300 hover:scale-105"
            } bg-[#FFFFFF] shadow-inner`}
            title="శ్వేతం (White)"
            aria-label="White Theme"
          />
          <button
            onClick={() => setReadingTheme("midnight")}
            className={`w-6 h-6 rounded-full border transition-all ${
              readingTheme === "midnight" ? "scale-110 ring-2 ring-[#A44A3F] border-transparent shadow-xs" : "border-stone-600 hover:scale-105"
            } bg-[#12151A]`}
            title="రాత్రి వేళ (Midnight)"
            aria-label="Midnight Dark Theme"
          />
        </div>

        <div className="h-4 w-[1px] bg-[var(--border-theme,#D5CCC0)]"></div>

        {/* Font Sizing Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={decreaseFontSize}
            className="px-2 py-1 text-xs font-bold rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-main,#1C1917)] transition"
            title="అక్షర పరిమాణం తగ్గించండి (A-)"
          >
            A-
          </button>
          <span className="text-xs uppercase font-mono font-bold px-1 text-[var(--text-main,#1C1917)]">
            {fontSize}
          </span>
          <button
            onClick={increaseFontSize}
            className="px-2 py-1 text-sm font-bold rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-main,#1C1917)] transition"
            title="అక్షర పరిమాణం పెంచండి (A+)"
          >
            A+
          </button>
        </div>

        <div className="h-4 w-[1px] bg-[var(--border-theme,#D5CCC0)]"></div>

        {/* Font Style Toggle Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFontMenu(!showFontMenu)}
            className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] transition flex items-center gap-1 text-xs"
            title="ఫాంట్ శైలిని మార్చండి"
          >
            <Type className="w-4 h-4" />
          </button>

          {showFontMenu && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-[var(--bg-content,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-xl shadow-xl p-2 text-xs z-50 animate-in fade-in">
              <div className="text-[10px] uppercase font-bold text-[var(--text-muted,#57534E)] px-2 py-1">
                ఫాంట్ ఎంపిక (Font Style)
              </div>
              <button
                onClick={() => {
                  setFontFamily("serif");
                  setShowFontMenu(false);
                }}
                className={`w-full text-left px-2.5 py-2 rounded-lg font-telugu-serif flex items-center justify-between transition ${
                  fontFamily === "serif"
                    ? "bg-[#A44A3F]/15 text-[#A44A3F] font-bold"
                    : "text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span>సాంప్రదాయ సెరిఫ్</span>
                {fontFamily === "serif" && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setFontFamily("sans");
                  setShowFontMenu(false);
                }}
                className={`w-full text-left px-2.5 py-2 rounded-lg font-telugu-sans flex items-center justify-between transition ${
                  fontFamily === "sans"
                    ? "bg-[#A44A3F]/15 text-[#A44A3F] font-bold"
                    : "text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span>ఆధునిక సాన్స్</span>
                {fontFamily === "sans" && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setFontFamily("poetry");
                  setShowFontMenu(false);
                }}
                className={`w-full text-left px-2.5 py-2 rounded-lg font-telugu-poetry flex items-center justify-between transition ${
                  fontFamily === "poetry"
                    ? "bg-[#A44A3F]/15 text-[#A44A3F] font-bold"
                    : "text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span>సురన్న కవిత్వ శైలి</span>
                {fontFamily === "poetry" && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        <div className="h-4 w-[1px] bg-[var(--border-theme,#D5CCC0)]"></div>

        {/* Action Buttons: Bookmark & Share & Print */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleBookmark(post)}
            className={`p-1.5 rounded-full transition ${
              bookmarked
                ? "text-[#A44A3F] bg-[#A44A3F]/15"
                : "text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:bg-black/10 dark:hover:bg-white/10"
            }`}
            title={bookmarked ? "బుక్‌మార్క్ తొలగించండి" : "తర్వాత చదవడానికి దాచుకోండి"}
          >
            {bookmarked ? (
              <BookmarkCheck className="w-4 h-4 fill-current" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="p-1.5 rounded-full text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:bg-black/10 dark:hover:bg-white/10 transition"
            title="రచనను పంచుకోండి (Share)"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="p-1.5 rounded-full text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:bg-black/10 dark:hover:bg-white/10 transition hidden sm:inline-flex"
            title="ముద్రించండి (Print)"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[var(--bg-content,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-[var(--text-main,#1C1917)]">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-theme,#D5CCC0)]">
              <h3 className="font-telugu-serif font-bold text-lg">రచనను పంచుకోండి</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-[var(--text-muted,#57534E)] hover:text-[var(--text-main,#1C1917)] p-1 rounded-lg hover:bg-black/5"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-[var(--text-sub,#44403C)] font-telugu-sans line-clamp-2">
              "{post.title}"
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center justify-center gap-2 p-2.5 bg-emerald-600 text-white rounded-lg text-xs font-telugu-sans font-semibold hover:bg-emerald-700 transition shadow-xs"
              >
                వాట్సాప్ (WhatsApp)
              </button>
              <button
                onClick={handleShareTwitter}
                className="flex items-center justify-center gap-2 p-2.5 bg-stone-900 text-white rounded-lg text-xs font-telugu-sans font-semibold hover:bg-black transition shadow-xs"
              >
                ట్విట్టర్ (X)
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 p-2.5 border border-[var(--border-theme,#D5CCC0)] bg-[var(--bg-surface,#FBF8F3)] rounded-lg text-xs font-telugu-sans font-medium text-[var(--text-main,#1C1917)] hover:bg-black/5 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">లింక్ కాపీ చేయబడింది!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[var(--text-sub,#44403C)]" />
                    <span>లింక్ కాపీ చేయండి (Copy Link)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
