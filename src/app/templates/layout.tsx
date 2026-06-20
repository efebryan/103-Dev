import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Website Templates & Boilerplates | 103 Dev",
  description: "Browse high-quality, production-ready SaaS boilerplates, admin dashboards, landing page kits, and mobile apps built for elite developers.",
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
