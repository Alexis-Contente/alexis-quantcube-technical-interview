import Link from "next/link";
import style from "./page.module.css";

export default function Header() {
  return (
    <header className={style.header}>
      <Link className={style.title} href="/">
        Quantcube Technical Interview
      </Link>
    </header>
  );
}
