import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { notFound } from "next/navigation";
import NotePreviewClient from "./NotePreview.client";

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const noteId = resolvedParams.id;

  const queryClient = new QueryClient();

  const note = await fetchNoteById(noteId);
  if (!note) notFound();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
