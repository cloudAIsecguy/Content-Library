"use client";

/**
 * Library Health — admin-oriented content gaps and cleanup recommendations.
 * TODO: Restrict this view to admins once an admin-role concept exists.
 * No admin-role concept exists yet; leave visible for all signed-in users.
 */
export default function LibraryHealthView() {
  return (
    <>
      <h1 className="pagetitle">Library Health</h1>
      <p className="pagesub">
        Review content gaps, folder mapping, legacy assets, and cleanup recommendations.
      </p>

      <div className="section">
        <div className="section-head">
          <h2>Content gaps</h2>
        </div>
        <div
          className="archive-note"
          style={{ marginBottom: 12, background: "#fef9e7", borderColor: "#f3e2a0", color: "#7a5c00" }}
        >
          ⚠️ CS gap: no onboarding, QBR, or renewal-playbook folders were found anywhere in this
          library. That content likely lives elsewhere (Gainsight? a separate CS Drive?) — worth
          confirming with the CS team before this section ships.
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Folder mapping &amp; taxonomy</h2>
        </div>
        <div className="gov-list" style={{ fontSize: 13, marginTop: 0 }}>
          <div>
            <strong>Recommend moving out of this hub entirely</strong> — not GTM content: HR Assets,
            17 Finance, Marketplace Transactions, Sales Agreements and Policies.
          </div>
          <div>
            <strong>Recommend a future 4th role/section, not SE/AE/CS</strong>: 14 Partners + Zscaler
            Partnership and Integration (Partner/Channel), top-level Marketing folder,
            Logos/Banners/Zoom Backgrounds (shared brand kit), Events.
          </div>
          <div>
            <strong>Needs a human decision</strong>: &quot;13 Sales Internal Resources&quot; is a
            near-duplicate of the whole top-level taxonomy — see Legacy Archive for details.
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Legacy archive candidates</h2>
        </div>
        <div className="archive-note">
          ⚠️ These three folders from your real library look like archive candidates today: a
          folder literally named &quot;Training Archive,&quot; and two folders built for the
          Google/Wiz acquisition news cycle, which has since passed.
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Other cleanup spotted in your Drive</h2>
        </div>
        <div className="gov-list" style={{ fontSize: 13, marginTop: 0 }}>
          <div>
            • &quot;11 Orca Agent&quot; and &quot;20 Orca Agent&quot; — two separate folders, same
            topic. Pick one.
          </div>
          <div>
            • &quot;TAG Cyber Report&quot; exists as two separate folders with the identical name.
          </div>
          <div>
            • Four duplicate shortcuts to &quot;2024 Orca Security Pitch Deck v1&quot; sitting
            loose at the library root.
          </div>
          <div>
            • &quot;13 Sales Internal Resources&quot; contains its own copies of ROI Calculator,
            Sales FAQ, Research Reports, Logos/Banners, and Live Events — all of which already
            exist as separate top-level folders. This nested duplicate tree is likely the biggest
            source of clutter.
          </div>
        </div>
      </div>
    </>
  );
}
