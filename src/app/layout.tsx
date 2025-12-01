import type { Metadata } from "next";
import "./globals.css";
import '@/lib/init';
import StaggeredMenu from "@/components/StaggeredMenu";
import FooterSection from "@/components/FooterSection";
import ClientLayout from "@/components/ClientLayout";
import { TransitionProvider } from "@/context/TransitionContext";
import StairsLoader from "@/components/StairsLoader";

export const metadata: Metadata = {
  title: "Viora",
  description: "Experience luxury redefined in digital form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="min-h-screen bg-white dark:bg-black font-['Norwester']"
      >
        <ClientLayout>
          <TransitionProvider>
            <StairsLoader />
            <StaggeredMenu />
            <main className="min-h-screen">
              {children}
            </main>
            <FooterSection />
          </TransitionProvider>
        </ClientLayout>
      </body>
    </html>
  );
}