"use client";

import { ROLE_CONFIG, ROLE_TOOLS } from "@/lib/driveConfig";
import QuerySection from "../QuerySection";

export default function RoleView({ roleKey }: { roleKey: "se" | "ae" | "cs" }) {
  const cfg = ROLE_CONFIG[roleKey];
  const tools = ROLE_TOOLS[roleKey];

  return (
    <>
      <div className="role-banner">
        <div className="emoji">{cfg.emoji}</div>
        <div>
          <h1>{cfg.title}</h1>
          <p>{cfg.desc}</p>
        </div>
      </div>

      <div className="section">
        <div className="section-head"><h2>Role-specific tools</h2></div>
        <div className="tool-grid">
          {tools.map((t) =>
            t.url === "#" ? (
              <div className="tool-card edit" key={t.name}>
                <div className="tname">{t.name}</div>
                <div className="tdesc">{t.desc} — link TBD</div>
              </div>
            ) : (
              <a className="tool-card" key={t.name} href={t.url} target="_blank" rel="noopener noreferrer">
                <div className="tname">{t.name}</div>
                <div className="tdesc">{t.desc}</div>
                <div className="tgo">Open →</div>
              </a>
            )
          )}
        </div>
      </div>

      {cfg.sections.map((s) => (
        <QuerySection key={s.id} label={s.label} query={s.query} pageSize={6} />
      ))}
    </>
  );
}
