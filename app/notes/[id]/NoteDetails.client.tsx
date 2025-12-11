"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const idStr = params.id;

  const query = useQuery({
    queryKey: ["note", idStr],
    queryFn: () => fetchNoteById(idStr),
    refetchOnMount: false,
  });

  const note = query.data;
  const isLoading = query.isLoading;
  const isError = query.isError;

  if (isLoading) return <p className={css.loading}>Loading...</p>;
  if (isError || !note) return <p className={css.error}>Failed to load note</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
        <button className={css.backBtn} onClick={() => router.back()}>
          ← Back to notes
        </button>
      </div>
    </div>
  );
}
