import type { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found | NoteHub",
  description:
    "The page you are looking for does not exist. Return to the homepage or explore your notes.",
  openGraph: {
    title: "Page Not Found | NoteHub",
    description:
      "The page you are looking for does not exist. Return to the homepage or explore your notes.",
    url: "https://notehub.com",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — page not found",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found | NoteHub",
    description: "The requested page could not be found.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
