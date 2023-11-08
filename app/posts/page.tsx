"use client";

import style from "./page.module.css";
import { useEffect, useState } from "react";
import { Posts } from "@/types/posts";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";

export default function Posts() {
  const baseUrlApi = process.env.BASE_URL_API;

  const [posts, setPosts] = useState<Posts[]>([]);

  const fetchPostsData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log("Impossible de récupérer les données de l'API", error);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);
  return (
    <>
      <Header />
      <main className={style.main}>
        {posts ? (
          posts.map((post) => (
            <div key={post.id} className={style.card_container}>
              <h1>{post.title}</h1>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </main>
      <Footer />
    </>
  );
}
