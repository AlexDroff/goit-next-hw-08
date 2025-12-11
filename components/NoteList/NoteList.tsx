"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import { useState } from "react";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      mutation.mutate(id);
    }
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <span className={css.badge}>{note.tag}</span>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.viewDetails}>
              View details
            </Link>
            <button
              className={css.deleteBtn}
              onClick={() => handleDelete(note.id)}
              disabled={deletingId === note.id}
            >
              {deletingId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
