"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import css from "./Notes.client.module.css";

interface NotesClientProps {
  initialTag?: NoteTag;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
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

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p className={css.noNotes}>No notes found.</p>
      )}
    </div>
  );
}
