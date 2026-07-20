import { Suspense } from "react";
import AppShell from "@/components/AppShell";

export default function Page() {
  return (
    <Suspense fallback={<div className="signin-screen" />}>
      <AppShell />
    </Suspense>
  );
}
