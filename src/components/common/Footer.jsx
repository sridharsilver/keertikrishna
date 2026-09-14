import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Feather, Send, Heart, Sparkles, Mail } from "lucide-react";
import { OrnamentDivider } from "../ui/OrnamentDivider";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#181512] text-[#E8E2D8] pt-16 pb-12 border-t-4 border-[#A44A3F] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Publication Identity & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-telugu-serif font-bold text-white leading-normal py-0.5">
                కీర్తి కృష్ణ
              </h2>
              <span className="text-xs font-brand tracking-[0.2em] text-[#A44A3F] font-semibold uppercase">
                KEERTI KRISHNA LITERARY JOURNAL
              </span>
            </Link>

            <p className="text-stone-400 font-telugu-sans text-sm leading-relaxed max-w-md">
              తెలుగు కథ, కవిత్వం మరియు సాహితీ విమర్శలకు అంకితమైన స్వతంత్ర డిజిటల్ పత్రిక. మానవ సంబంధాలు, అంతరంగ భావోద్వేగాలు మరియు జీవన స్పర్శను అక్షరీకరించే సృజనాత్మక వేదిక.
            </p>

            <div className="flex items-center gap-4 text-xs font-telugu-sans text-stone-400 pt-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C07D3E]" /> ప్రధాన సంపాదకులు: కీర్తి కృష్ణ
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-brand tracking-widest text-[#A44A3F] font-bold">
              విభాగాలు (Categories)
            </h4>
            <ul className="space-y-2 font-telugu-sans text-sm text-stone-400">
              <li>
                <Link to="/stories" className="hover:text-white transition flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#A44A3F]" /> కథలు (Stories)
                </Link>
              </li>
              <li>
                <Link to="/poems" className="hover:text-white transition flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-[#C07D3E]" /> కవితలు (Poems)
                </Link>
              </li>
              <li>
                <Link to="/stories?cat=essays" className="hover:text-white transition">
                  వ్యాసాలు (Essays)
                </Link>
              </li>
              <li>
                <Link to="/stories?cat=reflections" className="hover:text-white transition">
                  ఆలోచనలు (Reflections)
                </Link>
              </li>
              <li>
                <Link to="/authors" className="hover:text-white transition">
                  రచయితలు (Authors)
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-brand tracking-widest text-[#A44A3F] font-bold">
              పత్రిక (Journal)
            </h4>
            <ul className="space-y-2 font-telugu-sans text-sm text-stone-400">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  మా గురించి (About Us)
                </Link>
              </li>
              <li>
                <Link to="/about#submissions" className="hover:text-white transition">
                  రచనల సమర్పణ (Submissions)
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition">
                  శోధన (Search Archive)
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-white transition">
                  రీడింగ్ లిస్ట్ (Bookmarks)
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-brand tracking-widest text-[#A44A3F] font-bold">
              సాహితీ వార్తాపత్రిక (Newsletter)
            </h4>
            <p className="text-stone-400 font-telugu-sans text-xs leading-relaxed">
              ప్రతి వారం కొత్త కథలు, కవితలు నేరుగా మీ ఈమెయిల్‌లో అందుకోండి.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-900/40 border border-emerald-700/50 rounded-xl text-emerald-300 text-xs font-telugu-sans flex items-center gap-2">
                <Heart className="w-4 h-4 text-emerald-400 fill-current" />
                <span>ధన్యవాదాలు! మీ చందా నమోదైంది.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="మీ ఈమెయిల్ చిరునామా..."
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#A44A3F]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#A44A3F] hover:bg-[#8B3D34] text-white text-xs font-telugu-sans font-medium rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>సభ్యత్వం పొందండి</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright and literary note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-telugu-sans text-stone-500">
          <p>© {new Date().getFullYear()} కీర్తి కృష్ణ (Keerti Krishna). సర్వ హక్కులు ప్రత్యేకించబడ్డాయి.</p>
          <div className="flex items-center gap-1">
            <span>రూపకల్పన: స్వచ్ఛమైన తెలుగు సాహిత్యాభిమానం కోసం</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
