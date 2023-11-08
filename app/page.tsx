// IMPORTS
import style from "./page.module.css";
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Link className={style.link} href="/users">
          Users
        </Link>
        <Link className={style.link} href="/posts">
          Posts
        </Link>
        <Link className={style.link} href="/albums">
          Albums
        </Link>
        <Link className={style.link} href="/todos">
          Todos
        </Link>
      </main>
      <Footer />
    </>
  );
}
