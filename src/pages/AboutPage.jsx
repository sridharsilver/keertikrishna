import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Feather, Send, CheckCircle2, Heart, Award, Sparkles, Mail } from "lucide-react";
import { SEOHelmet } from "../components/common/SEOHelmet";
import { OrnamentDivider } from "../components/ui/OrnamentDivider";

export function AboutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "story",
    title: "",
    content: "",
    bio: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SEOHelmet
        title="మా గురించి & సాహిత్య దార్శనికత"
        description="కీర్తి కృష్ణ - తెలుగు సాహితీ మంజూష పత్రిక నేపథ్యం, సంపాదక మండలి మరియు రచనల సమర్పణ మార్గదర్శకాలు."
        slug="/about"
      />

      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-brand tracking-widest text-[#A44A3F] font-bold uppercase">
          పత్రిక నేపథ్యం (About Journal)
        </span>
        <h1 className="text-3xl sm:text-5xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-[1.35] py-1">
          కీర్తి కృష్ణ సాహిత్య మంజూష
        </h1>
        <p className="text-base sm:text-lg font-telugu-serif italic text-[var(--text-sub,#44403C)] max-w-2xl mx-auto leading-relaxed">
          "అక్షరం ఒక జీవన స్పర్శ... భావం ఒక అమృత ధార."
        </p>
      </div>

      {/* Manifesto Section */}
      <section className="bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-3xl p-8 sm:p-12 shadow-xs space-y-6 text-[var(--text-main,#1C1917)] font-telugu-serif text-base sm:text-lg leading-[2.1]">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#A44A3F] font-telugu-serif leading-normal py-0.5">
          మా ఆశయం & దార్శనికత (Our Manifesto)
        </h2>

        <p>
          తెలుగు భాషకు వేల సంవత్సరాల సాహిత్య సంపద ఉంది. ప్రాచీన కావ్యాల శోభ నుండి ఆధునిక వచన కథనం వరకు తెలుగు సాహిత్యం నిరంతరం పరిణామం చెందుతూనే ఉంది. ఈ వేగవంతమైన డిజిటల్ యుగంలో, నాణ్యమైన తెలుగు సాహిత్యాన్ని, స్వచ్ఛమైన పఠనానుభవాన్ని అందించడమే మా <strong>'కీర్తి కృష్ణ'</strong> పత్రిక ప్రధాన లక్ష్యం.
        </p>

        <p>
          సాధారణ సమాచార వెబ్‌సైట్ల రద్దీకి భిన్నంగా, ఒక చక్కని సాహిత్య పుస్తకాన్ని చేతిలోకి తీసుకుని చదువుతున్న అనుభూతిని డిజిటల్ మాధ్యమంలో ప్రతిబింబించడమే మా రూపకల్పనలోని ప్రత్యేకత.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[var(--border-theme,#D5CCC0)]">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#A44A3F]/15 text-[#A44A3F] flex items-center justify-center mx-auto shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-[var(--text-main,#1C1917)]">స్వతంత్ర సాహిత్యం</h4>
            <p className="text-xs font-telugu-sans text-[var(--text-sub,#44403C)] font-medium">
              వాణిజ్య ఆర్భాటాలు లేని నిర్మలమైన సృజనాత్మక రచనలు.
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#C07D3E]/15 text-[#C07D3E] flex items-center justify-center mx-auto shadow-xs">
              <Feather className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-[var(--text-main,#1C1917)]">కవిత్వ ప్రాధాన్యత</h4>
            <p className="text-xs font-telugu-sans text-[var(--text-sub,#44403C)] font-medium">
              తెలుగు వచన మరియు గేయ కవిత్వానికి విశాలమైన వేదిక.
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#2C423B]/15 text-[#2C423B] dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-[var(--text-main,#1C1917)]">సంపాదక నాణ్యత</h4>
            <p className="text-xs font-telugu-sans text-[var(--text-sub,#44403C)] font-medium">
              ప్రతి రచనకూ సంపాదకీయ మెరుగులు, అందమైన ప్రచురణ.
            </p>
          </div>
        </div>
      </section>

      <OrnamentDivider text="❦" />

      {/* Submissions Guide & Form */}
      <section id="submissions" className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-brand tracking-widest text-[#A44A3F] font-bold uppercase">
            రచనల ఆహ్వానం (Submissions)
          </span>
          <h2 className="text-3xl font-telugu-serif font-black text-[var(--text-main,#1C1917)] leading-normal py-0.5">
            మీ కథలు & కవితలను పంపండి
          </h2>
          <p className="text-sm font-telugu-sans text-[var(--text-sub,#44403C)] max-w-xl mx-auto">
            మీ ఆలోచనలను అక్షరాలుగా మార్చి మాకు పంపండి. ఎంపిక చేసిన రచనలను తగిన గౌరవంతో పత్రికలో ప్రచురిస్తాము.
          </p>
        </div>

        {/* Guidelines Box */}
        <div className="bg-stone-200/70 dark:bg-stone-800/60 rounded-2xl p-6 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm font-telugu-sans text-[var(--text-sub,#44403C)] space-y-2 shadow-xs">
          <h4 className="font-bold text-[var(--text-main,#1C1917)] text-base font-telugu-serif">
            ముఖ్య గమనికలు:
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 font-medium">
            <li>రచనలు స్వంతమై ఉండాలి (అనువాదమైతే మూల రచయిత అనుమతి తప్పనిసరి).</li>
            <li>కథలు గరిష్టంగా 3000 పదాల పరిమితిలో ఉండాలి.</li>
            <li>యూనికోడ్ (Unicode) తెలుగు ఫాంట్లలోనే సమర్పించాలి.</li>
            <li>ఎంపిక సమాచారాన్ని 2 వారాల్లోగా ఈమెయిల్ ద్వారా తెలియజేస్తాము.</li>
          </ul>
        </div>

        {/* Submission Form */}
        <div className="bg-[var(--bg-content,#FDFBF7)] border border-[var(--border-theme,#D5CCC0)] rounded-3xl p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-telugu-serif font-bold text-[var(--text-main,#1C1917)] leading-normal py-0.5">
                మీ రచన విజయవంతంగా అందింది!
              </h3>
              <p className="text-sm font-telugu-sans text-[var(--text-sub,#44403C)] max-w-md mx-auto">
                ధన్యవాదాలు. మా సంపాదక బృందం మీ రచనను సమీక్షించి త్వరలోనే మిమ్మల్ని సంప్రదిస్తుంది.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#A44A3F] text-white text-xs font-telugu-sans font-bold rounded-full hover:bg-[#8B3D34] transition shadow-xs"
              >
                మరొక రచన పంపండి
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-telugu-sans font-bold text-[var(--text-main,#1C1917)]">
                    మీ పేరు (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ఉదా: రామారావు"
                    className="w-full bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-telugu-sans focus:outline-none focus:ring-2 focus:ring-[#A44A3F] text-[var(--text-main,#1C1917)] placeholder:text-[var(--text-muted,#78716C)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-telugu-sans font-bold text-[var(--text-main,#1C1917)]">
                    ఈమెయిల్ చిరునామా (Email) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-telugu-sans focus:outline-none focus:ring-2 focus:ring-[#A44A3F] text-[var(--text-main,#1C1917)] placeholder:text-[var(--text-muted,#78716C)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-telugu-sans font-bold text-[var(--text-main,#1C1917)]">
                    రచన విభాగం (Category) *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-telugu-sans focus:outline-none focus:ring-2 focus:ring-[#A44A3F] text-[var(--text-main,#1C1917)]"
                  >
                    <option value="story">కథ (Story)</option>
                    <option value="poem">కవిత (Poem)</option>
                    <option value="essay">సాహిత్య వ్యాసం (Essay)</option>
                    <option value="reflection">ఆలోచనలు / అనుభవాలు (Reflections)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-telugu-sans font-bold text-[var(--text-main,#1C1917)]">
                    రచన శీర్షిక (Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="రచన శీర్షిక..."
                    className="w-full bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-telugu-sans focus:outline-none focus:ring-2 focus:ring-[#A44A3F] text-[var(--text-main,#1C1917)] placeholder:text-[var(--text-muted,#78716C)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-telugu-sans font-bold text-[var(--text-main,#1C1917)]">
                  రచన పాఠ్యం (Story / Poem Text in Telugu) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="మీ రచనను ఇక్కడ టైప్ చేయండి లేదా పేస్ట్ చేయండి..."
                  className="w-full bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-xl p-4 text-xs sm:text-sm font-telugu-sans focus:outline-none focus:ring-2 focus:ring-[#A44A3F] text-[var(--text-main,#1C1917)] placeholder:text-[var(--text-muted,#78716C)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-telugu-sans font-bold text-[var(--text-main,#1C1917)]">
                  రచయిత సంక్షిప్త పరిచయం (Short Author Bio)
                </label>
                <input
                  type="text"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="మీ వృత్తి, నివాసం మరియు పూర్వ రచనల వివరాలు..."
                  className="w-full bg-[var(--bg-surface,#FFFFFF)] border border-[var(--border-theme,#D5CCC0)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-telugu-sans focus:outline-none focus:ring-2 focus:ring-[#A44A3F] text-[var(--text-main,#1C1917)] placeholder:text-[var(--text-muted,#78716C)]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#A44A3F] hover:bg-[#8B3D34] text-white font-telugu-sans text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>రచనను సమర్పించండి (Submit Work)</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
