import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Bookmark,
  Menu,
  X,
  BookOpen,
  Feather,
  Users,
  Info,
  Compass,
  Heart,
  Palette,
  Check,
  Sun,
  Moon
} from "lucide-react";
import { useBookmarks } from "../../contexts/BookmarkContext";
import { useTheme } from "../../contexts/ThemeContext";

const THEME_OPTIONS = [
  {
    id: "parchment",
    name: "పాత కాగితం",
    label: "Parchment",
    bg: "#FBF8F3",
    border: "#D5CCC0",
    desc: "సాంప్రదాయ వెచ్చని కాగితపు రంగు"
  },
  {
    id: "white",
    name: "శ్వేతం",
    label: "Pure White",
    bg: "#FFFFFF",
    border: "#CBD5E1",
    desc: "స్వచ్ఛమైన స్పష్టమైన తెలుపు"
  },
  {
    id: "sepia",
    name: "సెపియా",
    label: "Sepia",
    bg: "#F4ECD8",
    border: "#C8B99D",
    desc: "కళ్ళకు ఆహ్లాదకరమైన బంగారు వర్ణం"
  },
  {
    id: "midnight",
    name: "రాత్రి వేళ",
    label: "Midnight",
    bg: "#12151A",
    border: "#3F3F46",
    desc: "రాత్రి సమయపు చీకటి మోడ్"
  }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { bookmarkCount } = useBookmarks();
  const { readingTheme, setReadingTheme } = useTheme();
  const themeMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close theme menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setThemeMenuOpen(false);
      }
    }
    if (themeMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themeMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "హోమ్", path: "/", icon: Compass },
    { name: "కథలు", path: "/stories", icon: BookOpen },
    { name: "కవితలు", path: "/poems", icon: Feather },
    { name: "రచయితలు", path: "/authors", icon: Users },
    { name: "పరిచయం", path: "/about", icon: Info }
  ];

  return (
    <>
      {/* Top Issue Notice Bar */}
      <div className="bg-[#1C1917] text-[#F5F5F4] text-[11px] sm:text-xs py-2.5 px-4 font-telugu-sans tracking-wide border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A44A3F] animate-pulse"></span>
            <span className="font-medium">సంచిక: మార్చి 2026 • తెలుగు స్వతంత్ర సాహిత్య పత్రిక</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#D6D3D1]">
            <Link to="/about" className="hover:text-white transition font-medium">రచనలు పంపడానికి</Link>
            <span>•</span>
            <Link to="/bookmarks" className="hover:text-white transition flex items-center gap-1 font-medium">
              <Bookmark className="w-3.5 h-3.5" />
              <span>దాచుకున్నవి ({bookmarkCount})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header / Masthead */}
      <header className="sticky top-0 z-40 bg-[var(--bg-toolbar,#FBF8F3)] backdrop-blur-md border-b border-[var(--border-theme,#D5CCC0)] transition-reading shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between min-h-[5.5rem] md:min-h-[6.25rem] py-3.5 md:py-4.5">
            {/* Mobile Menu Trigger */}
            <div className="flex items-center md:hidden z-10">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-[var(--text-main,#1C1917)] transition"
                aria-label="మెనూ తెరవండి"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Publication Masthead Logo (Centered on mobile, left-aligned on desktop) */}
            <div className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0 text-center md:text-left z-0 pointer-events-auto">
              <Link to="/" className="inline-flex flex-col items-center md:items-start group text-center md:text-left py-1">
                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] group-hover:text-[#A44A3F] transition-colors leading-normal whitespace-nowrap px-1 py-0.5 tracking-wide">
                  కీర్తి కృష్ణ
                </h1>
                <div className="flex items-center gap-1.5 sm:gap-2 justify-center md:justify-start mt-1">
                  <span className="text-[9px] sm:text-[10px] md:text-[11px] font-brand tracking-[0.2em] sm:tracking-[0.25em] text-[#A44A3F] font-bold uppercase whitespace-nowrap">
                    KEERTI KRISHNA
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[var(--text-muted,#57534E)] font-telugu-sans font-medium hidden sm:inline whitespace-nowrap">
                    | తెలుగు సాహితీ మంజూష
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-full font-telugu-sans text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-[#A44A3F] font-bold bg-[#A44A3F]/10 ring-1 ring-[#A44A3F]/30"
                        : "text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:bg-black/5 dark:hover:bg-white/5"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons (Theme Switcher, Search, Bookmarks) */}
            <div className="flex items-center gap-1 sm:gap-2 z-10">
              {/* Theme Switcher Popover */}
              <div className="relative" ref={themeMenuRef}>
                <button
                  onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                  className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] border border-transparent hover:border-[var(--border-theme,#D5CCC0)] transition"
                  title="రంగు శైలి మార్చండి (Change Theme)"
                  aria-label="Change Reading Theme"
                  aria-expanded={themeMenuOpen}
                >
                  <Palette className="w-5 h-5 text-[#A44A3F]" />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-stone-400 shadow-2xs hidden lg:inline-block"
                    style={{
                      backgroundColor:
                        THEME_OPTIONS.find((t) => t.id === readingTheme)?.bg || "#FBF8F3"
                    }}
                  />
                  <span className="text-xs font-telugu-sans font-medium hidden lg:inline-block">
                    {THEME_OPTIONS.find((t) => t.id === readingTheme)?.name}
                  </span>
                </button>

                {themeMenuOpen && (
                  <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 top-full mt-3 w-72 max-w-[calc(100vw-32px)] bg-[var(--bg-content,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 text-[var(--text-main,#1C1917)]">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-theme,#D5CCC0)] px-2">
                      <span className="text-xs font-bold font-brand tracking-wider uppercase text-[#A44A3F]">
                        రంగు శైలి (Theme)
                      </span>
                      <span className="text-[11px] font-telugu-sans text-[var(--text-muted,#78716C)]">
                        చదివే అనుభవం
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {THEME_OPTIONS.map((theme) => {
                        const isSelected = readingTheme === theme.id;
                        return (
                          <button
                            key={theme.id}
                            onClick={() => {
                              setReadingTheme(theme.id);
                              setThemeMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition font-telugu-sans ${
                              isSelected
                                ? "bg-[#A44A3F]/12 text-[#A44A3F] font-bold ring-1 ring-[#A44A3F]/30"
                                : "hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)]"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <span
                                className={`w-6 h-6 rounded-full border shadow-xs flex-shrink-0 transition-transform ${
                                  isSelected ? "scale-110 ring-2 ring-[#A44A3F]" : ""
                                }`}
                                style={{
                                  backgroundColor: theme.bg,
                                  borderColor: theme.border
                                }}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold leading-normal text-[var(--text-main,#1C1917)]">
                                  {theme.name}
                                </div>
                                <div className="text-[10px] text-[var(--text-muted,#78716C)] leading-tight mt-0.5 truncate">
                                  {theme.label} • {theme.desc}
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-[#A44A3F] flex-shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] transition"
                title="వెతకండి (Search)"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/bookmarks"
                className="relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] transition"
                title="దాచుకున్న రచనలు"
                aria-label="Saved Bookmarks"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarkCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#A44A3F] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {bookmarkCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-in fade-in">
          <div className="bg-[var(--bg-content,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-5 right-5 text-[var(--text-muted,#57534E)] hover:text-[var(--text-main,#1C1917)] p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition"
              aria-label="Close search modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-telugu-serif font-bold text-[var(--text-main,#1C1917)] mb-4">
              సాహిత్య శోధన (Search Literature)
            </h3>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="కథ, కవిత, రచయిత పేరు లేదా శీర్షికతో వెతకండి..."
                autoFocus
                className="w-full bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-xl pl-11 pr-24 py-3.5 text-base font-telugu-sans focus:outline-none focus:ring-2 focus:ring-[#A44A3F] text-[var(--text-main,#1C1917)] placeholder:text-[var(--text-muted,#78716C)]"
              />
              <Search className="w-5 h-5 text-[var(--text-muted,#78716C)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#A44A3F] hover:bg-[#8B3D34] text-white font-telugu-sans text-xs font-semibold rounded-lg transition shadow-xs"
              >
                వెతకండి
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[var(--border-theme,#D5CCC0)] flex flex-wrap items-center gap-2 text-xs font-telugu-sans text-[var(--text-sub,#44403C)]">
              <span className="font-medium">జనాదరణ పొందినవి:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("గోదావరి");
                }}
                className="px-2.5 py-1 bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium rounded-md hover:bg-[#A44A3F] hover:text-white transition"
              >
                #గోదావరి
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("నిశ్శబ్దం");
                }}
                className="px-2.5 py-1 bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium rounded-md hover:bg-[#A44A3F] hover:text-white transition"
              >
                #నిశ్శబ్దం
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("శ్రీధర్ శర్మ");
                }}
                className="px-2.5 py-1 bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium rounded-md hover:bg-[#A44A3F] hover:text-white transition"
              >
                #శ్రీధర్ శర్మ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in">
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[var(--bg-content,#FBF8F3)] border-r border-[var(--border-theme,#D5CCC0)] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-theme,#D5CCC0)]">
                <div>
                  <h2 className="text-xl font-telugu-serif font-black text-[var(--text-main,#1C1917)]">
                    కీర్తి కృష్ణ
                  </h2>
                  <span className="text-[10px] font-brand tracking-widest text-[#A44A3F] font-bold">
                    LITERARY JOURNAL
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--text-muted,#57534E)] hover:text-[var(--text-main,#1C1917)] hover:bg-black/5 dark:hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-4 space-y-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl font-telugu-sans text-base font-semibold transition ${
                          isActive
                            ? "bg-[#A44A3F] text-white font-bold shadow-xs"
                            : "text-[var(--text-sub,#44403C)] hover:text-[var(--text-main,#1C1917)] hover:bg-black/5 dark:hover:bg-white/5"
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* Theme Switcher in Mobile Drawer */}
              <div className="pt-4 border-t border-[var(--border-theme,#D5CCC0)]">
                <div className="text-xs font-bold font-brand tracking-wider uppercase text-[#A44A3F] mb-3 px-1 flex items-center gap-1.5">
                  <Palette className="w-4 h-4" />
                  <span>రంగు శైలి (Reading Theme)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {THEME_OPTIONS.map((theme) => {
                    const isSelected = readingTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => setReadingTheme(theme.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-telugu-sans font-medium transition text-left ${
                          isSelected
                            ? "bg-[#A44A3F]/15 border-[#A44A3F] text-[#A44A3F] font-bold shadow-xs"
                            : "bg-[var(--bg-surface,#FFFFFF)] border-[var(--border-theme,#D5CCC0)] text-[var(--text-sub,#44403C)] hover:border-stone-400"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                            isSelected ? "ring-2 ring-[#A44A3F]" : ""
                          }`}
                          style={{
                            backgroundColor: theme.bg,
                            borderColor: theme.border
                          }}
                        />
                        <div className="truncate">
                          <div className="truncate leading-tight text-xs font-semibold">{theme.name}</div>
                          <span className="text-[9px] text-[var(--text-muted,#78716C)] block mt-0.5">
                            {theme.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border-theme,#D5CCC0)] space-y-3 mt-4">
              <Link
                to="/bookmarks"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-[var(--bg-surface,#FFFFFF)] border-2 border-[var(--border-theme,#D5CCC0)] hover:border-[#A44A3F] text-[var(--text-main,#1C1917)] font-telugu-sans text-sm font-bold shadow-xs hover:bg-[#A44A3F]/5 transition group"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#A44A3F]/15 text-[#A44A3F] flex items-center justify-center group-hover:bg-[#A44A3F] group-hover:text-white transition">
                    <Bookmark className="w-4 h-4 fill-current" />
                  </span>
                  <span className="text-sm font-bold text-[var(--text-main,#1C1917)]">
                    దాచుకున్న రచనలు
                  </span>
                </span>
                <span className="px-2.5 py-1 bg-[#A44A3F] text-white text-xs font-bold rounded-full shadow-xs">
                  {bookmarkCount}
                </span>
              </Link>

              <p className="text-[11px] text-center text-[var(--text-sub,#44403C)] font-telugu-sans font-medium">
                తెలుగు సాహితీ మంజూష © 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
