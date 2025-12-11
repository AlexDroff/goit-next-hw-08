"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NoteError({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: "24px", textAlign: "center" }}>
      <h2>Failed to load note</h2>
      <p>Something went wrong. Please try again later.</p>
      <button onClick={() => router.back()} style={{ marginTop: "16px" }}>
        Go back
      </button>
    </div>
  );
}
