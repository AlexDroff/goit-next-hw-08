import type { ReactNode } from "react";
import css from "./filter-layout.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>{children}</main>
    </div>
  );
}
