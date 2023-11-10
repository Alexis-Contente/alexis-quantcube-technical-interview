"use client";

import style from "./page.module.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Loader from "@/components/loader/page";
import { useEffect, useState } from "react";
import { Posts } from "@/types/posts";
import Link from "next/link";

export default function PostsByUserId({ params }: { params: { id: string } }) {
  // STATES
  // Loader
  const [loading, setLoading] = useState(true);

  // Posts by userId
  const [postsByUserId, setPostsByUserId] = useState<Posts[]>([]);

  // Get posts by user id
  const fetchPostsByUserId = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${params.id}`
      );
      const data = await response.json();
      console.log("Posts by ID: ", data);
      setPostsByUserId(data);
    } catch (error) {
      console.log(
        `Impossible de récupérer les datas des posts de l'user id ${params.id}`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchPostsByUserId();
  }, []);

  return (
    <>
      <Header />
      <main>
        {loading ? (
          <Loader />
        ) : (
          <div className={style.posts_container}>
            {postsByUserId.map((post) => (
              <Link
                href={`/posts/${post.id}`}
                className={style.title}
                key={post.id}
              >
                {post.title}
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
