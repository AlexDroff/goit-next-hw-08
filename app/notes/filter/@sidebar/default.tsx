import Link from "next/link";
import css from "./SidebarNotes.module.css";

const TAGS = [
  { value: "all", label: "All notes" },
  { value: "Todo", label: "Todo" },
  { value: "Work", label: "Work" },
  { value: "Personal", label: "Personal" },
  { value: "Meeting", label: "Meeting" },
  { value: "Shopping", label: "Shopping" },
];

export default function SidebarNotes() {
  return (
    <div>
      <ul className={css.menuList}>
        {TAGS.map((tag) => (
          <li key={tag.value} className={css.menuItem}>
            <Link href={`/notes/filter/${tag.value}`} className={css.menuLink}>
              {tag.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
