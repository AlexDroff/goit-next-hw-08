import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note with title, content, and tag in NoteHub.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note with title, content, and tag in NoteHub.",
    url: "https://notehub.com/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create a new note in NoteHub",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Note | NoteHub",
    description: "Create a new note with title, content, and tag.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const CreateNotePage = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNotePage;
