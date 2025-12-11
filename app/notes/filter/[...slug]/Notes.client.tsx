"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes, fetchNoteById } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import css from "./Notes.client.module.css";

interface NotesClientProps {
  initialTag?: NoteTag;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 500);

  const perPage = 12;

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: [
      "notes",
      { tag: initialTag, search: debouncedSearch, page, perPage },
    ],
    queryFn: () =>
      fetchNotes({ tag: initialTag, search: debouncedSearch, page, perPage }),
    staleTime: 5000,
    placeholderData: (prev) => prev,
  });

  const previewNoteId = useMemo(() => {
    const match = pathname.match(/^\/notes\/(\d+)$/);
    return match ? match[1] : null;
  }, [pathname]);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error)
    return <p>Could not fetch the list of notes. {(error as Error).message}</p>;

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <div className={css.controlsRow}>
        <SearchBox onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.createButton}>
          Create note +
        </Link>
      </div>

      <NoteList notes={notes} />

      {previewNoteId && (
        <Modal onClose={() => window.history.back()}>
          <NotePreview noteId={previewNoteId} />
        </Modal>
      )}
    </div>
  );
}

function NotePreview({ noteId }: { noteId: string }) {
  const query = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const note = query.data;
  const isLoading = query.isLoading;
  const isError = query.isError;

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Failed to load note</p>;

  return (
    <div className={css.previewContainer}>
      <div className={css.previewItem}>
        <div className={css.previewHeader}>
          <h2>{note.title}</h2>
          <span className={css.previewTag}>{note.tag}</span>
        </div>
        <p className={css.previewContent}>{note.content}</p>
        <p className={css.previewDate}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
        <button
          className={css.previewBackBtn}
          onClick={() => window.history.back()}
        >
          ← Back to notes
        </button>
      </div>
    </div>
  );
}
