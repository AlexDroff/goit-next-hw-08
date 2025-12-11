import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const fetchNotes = async (params: FetchNotesParams = {}) => {
  const { search = "", page = 1, perPage = 12, tag } = params;

  const requestParams: Record<string, string | number> = {
    search,
    page,
    perPage,
  };

  if (tag) {
    requestParams.tag = tag;
  }

  const response = await client.get<FetchNotesResponse>("/notes", {
    params: requestParams,
  });

  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await client.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (payload: CreateNotePayload) => {
  const response = await client.post<Note>("/notes", payload);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await client.delete<Note>(`/notes/${id}`);
  return response.data;
};
