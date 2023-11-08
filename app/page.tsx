import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Link href="/users">Users</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/albums">Albums</Link>
        <Link href="/todos">Todos</Link>
      </main>
      <Footer />
    </>
  );
}
