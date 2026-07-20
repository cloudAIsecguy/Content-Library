"use client";

export default function SubmitView() {
  return (
    <>
      <h1 className="pagetitle">Submit a New Asset</h1>
      <p className="pagesub">
        The old library became a dumping ground because anyone could drop a file in with no
        owner or expiry. This intake step is how we keep the new one clean.
      </p>
      <div className="submit-box">
        <label>Asset title</label>
        <input placeholder="e.g. Q3 Competitive Battlecard — Wiz" />
        <label>Drive link</label>
        <input placeholder="Paste Google Drive share link" />
        <label>Role(s)</label>
        <select multiple size={3}>
          <option>Sales Engineers</option>
          <option>Account Executives</option>
          <option>Customer Success</option>
        </select>
        <label>Owner (accountable for keeping it current)</label>
        <input placeholder="name@orca.security" />
        <label>Review cadence</label>
        <select>
          <option>Every 3 months</option>
          <option>Every 6 months</option>
          <option>Every 12 months</option>
        </select>
        <button className="submit-btn">Submit for review →</button>
      </div>
      <div className="gov-list">
        <div>✓ Every asset needs an owner and a review date</div>
        <div>✓ Nothing publishes without a role tag</div>
        <div>✓ Missed reviews auto-flag to Legacy Archive, not deleted</div>
      </div>
    </>
  );
}
