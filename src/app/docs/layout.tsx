import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | 103 Dev",
  description: "Learn how to use 103 Dev premium website templates, reusable components, and developer APIs to accelerate your building workflow.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
