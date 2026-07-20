"use client";

import type { ViewKey } from "@/lib/types";
import QuerySection from "../QuerySection";

const ROLE_CARDS: { key: ViewKey; emoji: string; title: string; desc: string }[] = [
  { key: "se", emoji: "🛠️", title: "Sales Engineers", desc: "Competitive intel, technical deep dives, ROI tools" },
  { key: "ae", emoji: "💼", title: "Account Executives", desc: "Pitch decks, pricing, analyst reports" },
  { key: "cs", emoji: "🤝", title: "Customer Success", desc: "Customer refs, case studies" },
];

export default function HomeView({ setView }: { setView: (v: ViewKey) => void }) {
  return (
    <>
      <h1 className="pagetitle">Welcome back</h1>
      <p className="pagesub">
        A fresh, role-first home for GTM content — replacing the old Sites library.
        Pick a role on the left, or jump into what&apos;s recently changed in Drive below.
      </p>
      <div className="stat-row">
        <div className="stat-card"><div className="num">3</div><div className="lbl">Roles live (SE, AE, CS)</div></div>
        <div className="stat-card"><div className="num">9</div><div className="lbl">Curated content categories</div></div>
        <div className="stat-card"><div className="num" style={{ color: "var(--red)" }}>Legacy</div><div className="lbl">Old assets moved to Archive, not deleted</div></div>
        <div className="stat-card"><div className="num" style={{ color: "var(--green)" }}>Live</div><div className="lbl">Google Drive sync status</div></div>
      </div>

      <QuerySection
        label="Recently updated across all roles"
        query="trashed = false"
        orderBy="modifiedTime desc"
        pageSize={8}
        hideFolders
      />

      <div className="section">
        <div className="section-head"><h2>Jump to a role</h2></div>
        <div className="tool-grid">
          {ROLE_CARDS.map((r) => (
            <button className="tool-card" key={r.key} onClick={() => setView(r.key)}>
              <div className="tname">{r.emoji} {r.title}</div>
              <div className="tdesc">{r.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head"><h2>Housekeeping — based on your real Drive folder</h2></div>
        <div className="archive-note" style={{ marginBottom: 12, background: "#fef9e7", borderColor: "#f3e2a0", color: "#7a5c00" }}>
          ⚠️ CS gap: no onboarding, QBR, or renewal-playbook folders were found anywhere in this
          library. That content likely lives elsewhere (Gainsight? a separate CS Drive?) — worth
          confirming with the CS team before this section ships.
        </div>
        <div className="gov-list" style={{ fontSize: 13 }}>
          <div><strong>Recommend moving out of this hub entirely</strong> — not GTM content: HR Assets, 17 Finance, Marketplace Transactions, Sales Agreements and Policies.</div>
          <div><strong>Recommend a future 4th role/section, not SE/AE/CS</strong>: 14 Partners + Zscaler Partnership and Integration (Partner/Channel), top-level Marketing folder, Logos/Banners/Zoom Backgrounds (shared brand kit), Events.</div>
          <div><strong>Needs a human decision</strong>: &quot;13 Sales Internal Resources&quot; is a near-duplicate of the whole top-level taxonomy — see Legacy Archive for details.</div>
        </div>
      </div>
    </>
  );
}
