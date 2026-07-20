"use client";

import { useState } from "react";
import type { ViewKey } from "@/lib/types";
import QuerySection from "../QuerySection";
import QuickAccess from "../QuickAccess";
import FeaturedSection from "../FeaturedSection";

const ROLE_CARDS: {
  key: ViewKey;
  title: string;
  subtitle: string;
  topics: string[];
  cta: string;
}[] = [
  {
    key: "se",
    title: "Sales Engineers",
    subtitle: "Technical selling resources",
    topics: ["Technical deep dives", "Architecture", "Competitive guidance", "Demos"],
    cta: "Browse SE content →",
  },
  {
    key: "ae",
    title: "Account Executives",
    subtitle: "Resources to help win deals",
    topics: ["Pitch decks", "Pricing", "Discovery", "Objection handling"],
    cta: "Browse AE content →",
  },
  {
    key: "cs",
    title: "Customer Success",
    subtitle: "Resources to grow customers",
    topics: ["Customer references", "Adoption", "QBRs", "Renewals"],
    cta: "Browse CS content →",
  },
];

const SEARCH_CHIPS = [
  "Competitive",
  "Customer Stories",
  "Pricing",
  "Demos",
  "AWS",
  "AI Security",
  "Healthcare",
  "ROI",
];

export default function HomeView({
  setView,
  onSearch,
}: {
  setView: (v: ViewKey) => void;
  onSearch: (term: string) => void;
}) {
  const [term, setTerm] = useState("");

  function submitSearch(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  function handleChip(chip: string) {
    setTerm(chip);
    onSearch(chip);
  }

  return (
    <div className="home">
      <header className="home-hero">
        <h1 className="home-hero-title">Find GTM content</h1>
        <p className="home-hero-sub">
          Search presentations, battlecards, customer stories, pricing, videos, technical
          content, and more.
        </p>
        <div className="home-search">
          <div className="search-wrap home-search-wrap">
            <span className="icon" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitSearch(term);
              }}
              placeholder="Search by topic, competitor, customer, platform, or asset name..."
              aria-label="Search content"
            />
          </div>
          <div className="search-chips">
            {SEARCH_CHIPS.map((chip) => (
              <button
                type="button"
                key={chip}
                className="search-chip"
                onClick={() => handleChip(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="section home-section">
        <div className="section-head">
          <h2>Choose your role</h2>
        </div>
        <div className="tool-grid role-grid">
          {ROLE_CARDS.map((r) => (
            <button
              type="button"
              className="tool-card role-card"
              key={r.key}
              onClick={() => setView(r.key)}
            >
              <div className="tname">{r.title}</div>
              <div className="tdesc">{r.subtitle}</div>
              <ul className="role-topics">
                {r.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <div className="tgo">{r.cta}</div>
            </button>
          ))}
        </div>
      </div>

      <FeaturedSection />

      <QuickAccess onOpenFavorites={() => setView("favorites")} />

      <QuerySection
        label="What's New"
        description="Recently published and updated GTM content."
        query="trashed = false"
        orderBy="modifiedTime desc"
        pageSize={6}
        hideFolders
        whatsNewCards
      />
    </div>
  );
}
