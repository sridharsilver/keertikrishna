import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BookmarkProvider } from "./contexts/BookmarkContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { ScrollToTop } from "./components/common/ScrollToTop";

import { HomePage } from "./pages/HomePage";
import { StoriesPage } from "./pages/StoriesPage";
import { StoryDetailPage } from "./pages/StoryDetailPage";
import { PoemsPage } from "./pages/PoemsPage";
import { PoemDetailPage } from "./pages/PoemDetailPage";
import { AuthorsPage } from "./pages/AuthorsPage";
import { AuthorDetailPage } from "./pages/AuthorDetailPage";
import { SearchPage } from "./pages/SearchPage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { AboutPage } from "./pages/AboutPage";

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BookmarkProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/stories" element={<StoriesPage />} />
                  <Route path="/stories/:slug" element={<StoryDetailPage />} />
                  <Route path="/poems" element={<PoemsPage />} />
                  <Route path="/poems/:slug" element={<PoemDetailPage />} />
                  <Route path="/authors" element={<AuthorsPage />} />
                  <Route path="/authors/:slug" element={<AuthorDetailPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </BookmarkProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
