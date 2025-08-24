export const metadata = {
  title: "AdForge",
  description: "Scout products and generate AI-powered ad copy",
};

import "./globals.css";
import NavBar from "@/components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <NavBar />
        <main className="container py-6">{children}</main>
        <footer className="container py-8 text-center text-xs text-gray-500">
          Built with Next.js + Tailwind
        </footer>
      </body>
    </html>
  );
}

