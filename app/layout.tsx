import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TanstackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Your personal note-taking app powered by GoIT",
  openGraph: {
    title: "NoteHub",
    description: "Your personal note-taking app powered by GoIT",
    url: "https://notehub.com",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — manage your notes efficiently",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub",
    description: "Your personal note-taking app powered by GoIT",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={roboto.variable}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <TanstackProvider>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
            {modal}
          </main>
          <Footer />
        </TanstackProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
