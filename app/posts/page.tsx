"use client";

// IMPORTS
import style from "./page.module.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Loader from "@/components/loader/page";
import { useEffect, useState } from "react";
import { Posts } from "@/types/posts";

export default function Posts() {
  const baseUrlApi = process.env.BASE_URL_API;

  // STATES
  // Loader
  const [loading, setLoading] = useState<boolean>(true);
  // Posts
  const [posts, setPosts] = useState<Posts[]>([]);

  // API CALL
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
    } finally {
      setLoading(false);
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchPostsData();
  }, []);
  return (
    <>
      <Header />
      <main className={style.main}>
        {loading ? (
          <Loader />
        ) : (
          posts.map((post) => (
            <div key={post.id} className={style.card_container}>
              <h1>{post.title}</h1>
            </div>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
