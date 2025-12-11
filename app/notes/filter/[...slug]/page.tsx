import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

const VALID_TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tagValue = resolvedParams.slug?.[0];

  const isAll = tagValue === "all";
  const isValidTag =
    tagValue && (VALID_TAGS as readonly string[]).includes(tagValue);

  let title: string;
  let description: string;

  if (isAll || !tagValue) {
    title = "All Notes | NoteHub";
    description =
      "View all your notes in NoteHub — your personal note-taking app.";
  } else if (isValidTag) {
    title = `Notes tagged: ${tagValue} | NoteHub`;
    description = `All notes tagged as "${tagValue}" in your NoteHub workspace.`;
  } else {
    title = "Filtered Notes | NoteHub";
    description = "Browse your filtered notes in NoteHub.";
  }

  const url = tagValue
    ? `https://notehub.com/notes/filter/${tagValue}`
    : "https://notehub.com/notes/filter/all";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tagValue = resolvedParams.slug?.[0];

  const initialTag: NoteTag | undefined =
    tagValue &&
    tagValue !== "all" &&
    (VALID_TAGS as readonly string[]).includes(tagValue)
      ? (tagValue as NoteTag)
      : undefined;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { tag: initialTag }],
    queryFn: () => fetchNotes({ tag: initialTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={initialTag} />
    </HydrationBoundary>
  );
}
