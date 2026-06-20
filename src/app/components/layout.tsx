import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Copy-Paste UI Components | 103 Dev",
  description: "Explore fully responsive, premium copy-pasteable Tailwind CSS and React UI components. Build gorgeous user interfaces in seconds.",
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
