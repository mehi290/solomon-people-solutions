import { createFileRoute } from "@tanstack/react-router";
import { SimpleShell } from "@/components/sps/Shared";
import { noindexMeta } from "@/lib/sps";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy | Solomon People Solutions" },
      { name: "description", content: "Privacy policy for Solomon People Solutions." },
      { property: "og:title", content: "Privacy policy | Solomon People Solutions" },
      { property: "og:description", content: "Privacy policy for Solomon People Solutions." },
      ...noindexMeta,
    ],
  }),
  component: () => (
    <SimpleShell>
      <h1 className="mt-6 font-display text-3xl">Privacy policy</h1>
      <p className="mt-4 text-destructive">PLACEHOLDER: SPS to provide the privacy policy text.</p>
    </SimpleShell>
  ),
});
