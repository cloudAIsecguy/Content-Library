// Folder-ID mapping derived from Tim's real "Content Library" Drive folder
// (https://drive.google.com/drive/folders/1bOBp-4Z9R2ZVnIR-YF6v2hsoAjNBmpmC).
// This is a first-pass guess at folder -> role mapping. See Library Health
// in the app for what still needs a human decision.

export const LIBRARY_ROOT = "1bOBp-4Z9R2ZVnIR-YF6v2hsoAjNBmpmC";

// Real Google Drive API v3 query syntax: `'FOLDER_ID' in parents`
export function pidQuery(ids: string[]): string {
  const clause = ids.map((id) => `'${id}' in parents`).join(" or ");
  return `(${clause}) and trashed = false`;
}

export interface RoleSection {
  id: string;
  label: string;
  query: string;
}

export interface RoleConfig {
  title: string;
  emoji: string;
  desc: string;
  sections: RoleSection[];
}

export const ROLE_TOOLS: Record<
  string,
  { name: string; desc: string; url: string }[]
> = {
  se: [
    { name: "Opine", desc: "Deal-desk & POV feedback tool", url: "https://tryopine.com" },
    {
      name: "SE Confluence",
      desc: "Technical playbooks & runbooks",
      url: "https://orcasecurity.atlassian.net/wiki/spaces/SETeam/overview",
    },
    {
      name: "Crayon",
      desc: "Competitive intel & battlecards",
      url: "https://app.crayon.co/intel/orca-security/home/",
    },
  ],
  ae: [
    { name: "Salesforce", desc: "Opportunity & pipeline data", url: "#" },
    { name: "Gong", desc: "Call recordings & coaching", url: "#" },
    { name: "Highspot", desc: "Buyer-facing sales content", url: "#" },
  ],
  cs: [
    { name: "Gainsight", desc: "Health scores & renewals", url: "#" },
    { name: "CS Confluence", desc: "Onboarding & QBR templates", url: "#" },
    { name: "Slack #customer-success", desc: "Team channel", url: "#" },
  ],
};

export const ROLE_CONFIG: Record<string, RoleConfig> = {
  se: {
    title: "Sales Engineers",
    emoji: "🛠️",
    desc: "Mapped from your actual Content Library folders — competitive, product-technical, and value-engineering content.",
    sections: [
      {
        id: "se-comp",
        label: "Competitive & Displacement",
        query: pidQuery([
          "1MXPAKQQvV-aadq_J1w3f-BSo7vpb-G4h", // 2 Competitive Intelligence
          "1wIP4IFSmTd-BmoQoq0o43zB4xYgkVRxR", // Orca Technical Differentiators
          "1P1qtsD2dPIK2AgjhCUVRRhxoIGGmBw-R", // Wiz to Orca Migration
          "1DWx7Vp4FFlwM0iE7YNf4FaVuZaP8sZlN", // Migration Plan: Wiz to Orca Security
          "1iyJrG4sRPrWfgBG_RFFnEymTR3eUXzre", // Wiz Pricing Docs
        ]),
      },
      {
        id: "se-tech",
        label: "Product & Technical Deep Dives",
        query: pidQuery([
          "1TIudCmYZFsisv3GXvulSnKfeFz94vier", // 3 Recorded Demo
          "1pdRFTPHCUZNP5wTVmCi5T-f5lNXUb3-9", // 11 Orca Agent
          "1jWi3O-oWXCdxrFJ-v9SxZ6_YJGWkWDi5", // 20 Orca Agent (dup, see housekeeping)
          "1yFe9Ix1GCYgcHxiNXu9qG6VcOc0AMhO2", // Orca AI Functions FAQ
          "1K0lNYS9Ul0zqHJlpOdOD-r4YqL4kU9Z9", // Orca Sensor
          "19m9OGnJXK6sbAK8ZK4RRJZ5NC10ZvgHy", // AppSec
          "1F-gsfNp8MESNt_IEIMMseJZLW0KOLzZZ", // 12 FedRAMP
        ]),
      },
      {
        id: "se-value",
        label: "Value Engineering",
        query: pidQuery([
          "15z9sDip5d5Y8cZrHsJ7Wwcoldurf8NYq", // 18 ROI Calculator and Cloud Cost Optimization
        ]),
      },
    ],
  },
  ae: {
    title: "Account Executives",
    emoji: "💼",
    desc: "Mapped from your actual Content Library folders — pitch, pricing/objection handling, and analyst proof points.",
    sections: [
      {
        id: "ae-pitch",
        label: "Pitch & Positioning",
        query: pidQuery([
          "1kgz8ayMZkAuZz4Muzih-Rk3nzRvQ7_G5", // 1 Pitch Deck
          "1NXDBcNErKWOY_mHODzP9I_MJC1-3u24R", // 5 Positioning and Personas
          "1DVnnzqBvDmjKjkrJL96kYCkO0xd78wmp", // Messaging and Positioning
          "1tcbSf60VGVE-PogevLbHRsojrSVEwuOD", // Slide Deck Toolkit Template
          "1znTQOQql1VsmJrUQt977QQSACr3PllOX", // Sales Presentation and Document Templates
          "18lUn5pxLZQ5w-fvvAubWFyiOiQm0v8ju", // Sales Presentations Library
          "1HeoHcmdjRr27xodKNDP1tYSU7lOzD_4g", // DataSheets and Solution Briefs
          "1fH7KXsy3tMC6XFpXl7m25CeQYJTUEXds", // 15 Security and IT (persona page)
        ]),
      },
      {
        id: "ae-pricing",
        label: "Pricing, FAQ & Objection Handling",
        query: pidQuery([
          "1OjloKfNorZSsCEWOSKYT8oLRdKDUGy3c", // 9 Pricing and Packaging
          "113uY7LUcVBO9aw3s7lfNDHCa4UE-qz_o", // 6 Sales FAQ
          "1zF8Ves8Y91W5fS1QjFkB-uDyfh5R6e5y", // Cheat Sheets
          "1SCaVHoRLZVQCczV086Uv29zh-CPA0Yth", // 7 Sales Toolkit
          "1I4xMYYAUo7NFN7lBeSt_ltZB0mQ15Ly8", // 4 Sales Enablement
          "1w9PIEbplnPu6NQ7TpuPs5OrIb3ttsnha", // Sales Excellence
          "1peOYre4BrHxA2gLRkGMsb_jP9a9h-t8W", // 10 Collateral
        ]),
      },
      {
        id: "ae-research",
        label: "Research & Analyst Reports",
        query: pidQuery([
          "1lXykr0lcBdeahr1KSXGrHRu3WTvXRU4L", // Research Reports
          "1sqs_-It73WcbEXaNNqsgzS0GIby8Tpxz", // TAG Cyber Report (a)
          "1-OnbedRTbjkQIC-KleeRBxYEzoaAYuxP", // TAG Cyber Report (b, dup)
          "1ZHoHYL8I3EyVQ1fQkxwKzHs2q17mge82", // 2026 State of AI Security Report
          "1SERa7CuasF8bW0HUkR9kXmMUWg3lKxXp", // 2025 State of Cloud Security Report
        ]),
      },
    ],
  },
  cs: {
    title: "Customer Success",
    emoji: "🤝",
    desc: "Mapped from what actually exists today — mostly references & case studies. Onboarding/QBR/renewal content wasn't found in this folder.",
    sections: [
      {
        id: "cs-refs",
        label: "Customer References & Case Studies",
        query: pidQuery([
          "1cqVeKTPjj9jRN6UGpLwu__SSIBuC3Q3p", // 8 Customer References
          "1dHhjrQ3vz03Gjs3eTFVT7rA-kHi24A73", // 19 Case Studies
          "1mYk4x4Ukwxt7m6ALIYR4rr6M4FdD0VzD", // 16 Customers
        ]),
      },
      {
        id: "cs-account",
        label: "Account & Product Resources",
        query: pidQuery([
          "1BWLEntAfceq0LMkzt-Lj0BAhW1N1spEG", // User Center
          "1_BVUMZGXerC1UmnsLgec8G11GfsZZqg0", // 21 Pod Pages
        ]),
      },
    ],
  },
};

export const ARCHIVE_FOLDER_IDS = [
  "1sB9ayOOxJ3HE2d--S4wOWz-n5zC_Po7a", // Training Archive
  "11_-z-qvUd0WhInTcxGL2_Djh9rqFVp9g", // Google Acquiring Wiz
  "1hUO_1l597H1sBZda6D-njJY9vbZvb38n", // Sales Kit: Rapid Response - Google Acquiring Wiz
];
