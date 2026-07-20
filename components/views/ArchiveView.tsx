"use client";

import { useState } from "react";
import { ARCHIVE_FOLDER_IDS, pidQuery } from "@/lib/driveConfig";
import QuerySection from "../QuerySection";

export default function ArchiveView() {
  const [show, setShow] = useState(false);

  return (
    <>
      <h1 className="pagetitle">Legacy Archive</h1>
      <p className="pagesub">
        Old assets aren&apos;t deleted — they&apos;re moved here, out of the way, until an owner
        reviews and either refreshes or retires them. Nothing here shows up in role pages or
        search by default.
      </p>
      <div className="archive-note">
        ⚠️ These three folders from your real library look like archive candidates today: a
        folder literally named &quot;Training Archive,&quot; and two folders built for the
        Google/Wiz acquisition news cycle, which has since passed.
      </div>
      <label className="archive-toggle">
        <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
        <div>
          <div className="lbl">Show legacy content</div>
          <div className="sub">Hidden by default — this is the point.</div>
        </div>
      </label>
      {show && <QuerySection query={pidQuery(ARCHIVE_FOLDER_IDS)} pageSize={10} dim />}

      <div className="section" style={{ marginTop: 26 }}>
        <div className="section-head"><h2>Other cleanup spotted in your Drive</h2></div>
        <div className="gov-list" style={{ fontSize: 13 }}>
          <div>• &quot;11 Orca Agent&quot; and &quot;20 Orca Agent&quot; — two separate folders, same topic. Pick one.</div>
          <div>• &quot;TAG Cyber Report&quot; exists as two separate folders with the identical name.</div>
          <div>• Four duplicate shortcuts to &quot;2024 Orca Security Pitch Deck v1&quot; sitting loose at the library root.</div>
          <div>• &quot;13 Sales Internal Resources&quot; contains its own copies of ROI Calculator, Sales FAQ, Research Reports, Logos/Banners, and Live Events — all of which already exist as separate top-level folders. This nested duplicate tree is likely the biggest source of clutter.</div>
        </div>
      </div>
    </>
  );
}
