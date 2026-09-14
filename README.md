# కీర్తి కృష్ణ | Keerti Krishna — తెలుగు సాహితీ మంజూష
### Modern Headless WordPress & React Telugu Literary Journal

A digital literary journal dedicated to **Telugu Stories, Poems, Essays, Reflections, and Author Profiles**. Built with **React 19 + Vite**, **Headless WordPress REST API**, **Tailwind CSS v4**, and authentic **Telugu Typography**.

---

## 🌟 Key Features

### 1. 📖 Premium Editorial Reading Experience
- **Dedicated Story Reader**: Comfortable reading column, large editorial headlines, stylized drop caps (`.story-body`), estimated reading time, author byline, date, word counts, and next/previous story pagination.
- **Dedicated Poem Reader**: Preserves exact poetic stanzas and line breaks, narrower reading column, non-justified cadence, emotion tags, and author footnotes.
- **Reader Controls Toolbar**:
  - 🎨 **Reading Themes**: *Parchment (పాత కాగితం)*, *Classic White (శ్వేతం)*, *Warm Sepia (పురాతన పత్రం)*, *Midnight Dark (రాత్రి వేళ)*
  - 🔠 **Font Size Adjustment**: `A-` / `A+` dynamic scaling
  - ✒️ **Typography Switcher**: Noto Serif Telugu (సాంప్రదాయ సెరిఫ్), Noto Sans Telugu (ఆధునిక సాన్స్), Suranna (కవిత్వ శైలి)
  - 📌 **Reading List / Bookmarks**: Instant saving backed by `localStorage`
  - 🔗 **Social Sharing**: WhatsApp, Twitter/X, and 1-click Link Copy
  - 🖨️ **Print Ready**: Clean print styling with distraction-free layout

### 2. ⚡ Headless WordPress Architecture
- **Centralized Service (`src/services/wordpress.js`)**:
  - Connects to any standard WordPress instance (`/wp-json/wp/v2/posts`, `categories`, `tags`, `users`).
  - Gracefully falls back to an authentic, culturally rich Telugu literary dataset when `VITE_WORDPRESS_URL` is empty, allowing instant testing and development.
- **Data Mapper (`src/services/mapper.js`)**: Normalizes WordPress REST API entities, calculates read times, strips HTML excerpts, and formats media thumbnails.

### 3. 🔍 Search & Discovery
- Real-time search across titles, contents, excerpts, and author names.
- Filter by type: *All*, *Stories (కథలు)*, *Poems (కవితలు)*, *Authors (రచయితలు)*.
- Literary tag filtering: *ప్రేమ*, *జ్ఞాపకాలు*, *జీవితం*, *తత్వశాస్త్రం*, *సంబంధాలు*, *ప్రకృతి*, *ఏకాంతం*, *ఆశ*, *పల్లెటూరు*, *కాలం*.

### 4. ✍️ Author Directory & Submission Portal
- Contributor directory with author portraits, bios, social links, and categorized list of published works.
- Interactive literary submission portal on the About page for writers to submit stories and poems.

### 5. 🚀 SEO & Performance
- Dynamic page titles and meta descriptions using `react-helmet-async`.
- Open Graph and Twitter Card tags.
- Schema.org `BlogPosting` and `WebSite` JSON-LD structured data.
- Responsive images and sub-second bundle performance.

---

## 🛠️ Project Structure

```
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── StoryCard.jsx          # Hero & standard story cards
│   │   │   ├── PoemCard.jsx           # Dedicated poetry cards
│   │   │   └── AuthorCard.jsx         # Contributor showcase
│   │   ├── common/
│   │   │   ├── Navbar.jsx             # Masthead, search modal, drawer
│   │   │   ├── Footer.jsx             # Editorial manifesto & newsletter
│   │   │   ├── ReadingProgressBar.jsx # Longform scroll progress
│   │   │   ├── ScrollToTop.jsx        # Route transition scroll reset
│   │   │   └── SEOHelmet.jsx          # Open Graph & Structured Data
│   │   ├── reader/
│   │   │   └── ReaderToolbar.jsx      # Theme, font size, bookmark controls
│   │   └── ui/
│   │       ├── EmptyState.jsx         # Empty results display
│   │       ├── OrnamentDivider.jsx    # Telugu literary flourish (❦ ✦)
│   │       └── SkeletonLoader.jsx     # Pulse loading skeletons
│   ├── contexts/
│   │   ├── ThemeContext.jsx           # Reading themes & typography state
│   │   └── BookmarkContext.jsx        # Reading list localStorage state
│   ├── data/
│   │   └── mockData.js                # Authentic Telugu literary dataset
│   ├── hooks/
│   │   ├── useScrollProgress.js       # Scroll progress tracking
│   │   └── useWordPress.js            # Async WP data hook
│   ├── pages/
│   │   ├── HomePage.jsx               # Magazine cover & curated issue
│   │   ├── StoriesPage.jsx            # Stories & essays archive
│   │   ├── StoryDetailPage.jsx        # Longform story reader
│   │   ├── PoemsPage.jsx              # Poetry collections
│   │   ├── PoemDetailPage.jsx         # Dedicated poem reader
│   │   ├── AuthorsPage.jsx            # Contributor directory
│   │   ├── AuthorDetailPage.jsx       # Author biography & works
│   │   ├── SearchPage.jsx             # Search results
│   │   ├── BookmarksPage.jsx          # Saved reading list
│   │   └── AboutPage.jsx              # Journal manifesto & submissions
│   ├── services/
│   │   ├── wordpress.js               # WordPress REST API client
│   │   └── mapper.js                  # Response normalization
│   ├── styles/
│   │   └── index.css                  # Tailwind v4, themes, drop caps
│   ├── App.jsx                        # React Router configuration
│   └── main.jsx
├── .env.example
├── package.json
└── vite.config.js
```

---

## 💻 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Configure WordPress (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Set your WordPress site URL in `.env`:
```env
VITE_WORDPRESS_URL=https://your-wordpress-site.com
```
*Note: If `VITE_WORDPRESS_URL` is empty, the application automatically uses the built-in authentic Telugu mock dataset.*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment

### Vercel
1. Push your repository to GitHub / GitLab.
2. Import the project in Vercel.
3. Add Environment Variable `VITE_WORDPRESS_URL` (if using a live WordPress site).
4. Deploy!

### Netlify
1. Create a `_redirects` file in `public/` with:
   ```
   /*    /index.html   200
   ```
2. Build command: `npm run build`
3. Publish directory: `dist`

---

## 📜 License
© 2026 **కీర్తి కృష్ణ (Keerti Krishna)**. All rights reserved.
