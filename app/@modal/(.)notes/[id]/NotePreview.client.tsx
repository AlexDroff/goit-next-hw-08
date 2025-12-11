"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const idStr = params.id;

  const query = useQuery<Note>({
    queryKey: ["note", idStr],
    queryFn: () => fetchNoteById(idStr),
    refetchOnMount: false,
  });

  const note = query.data;
  const isLoading = query.isLoading;
  const isError = query.isError;

  if (isLoading) return <div>Loading...</div>;
  if (isError || !note) return <div>Failed to load note</div>;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <button className={css.closeBtn} onClick={() => router.back()}>
          ← Back to notes
        </button>
        <div className={css.item}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>{new Date(note.createdAt).toLocaleString()}</p>
          <span className={css.tag}>{note.tag}</span>
        </div>
      </div>
    </Modal>
  );
}
