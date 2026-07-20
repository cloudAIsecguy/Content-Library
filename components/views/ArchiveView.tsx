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
      <label className="archive-toggle">
        <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
        <div>
          <div className="lbl">Show legacy content</div>
          <div className="sub">Hidden by default — this is the point.</div>
        </div>
      </label>
      {show && <QuerySection query={pidQuery(ARCHIVE_FOLDER_IDS)} pageSize={10} dim />}
    </>
  );
}
