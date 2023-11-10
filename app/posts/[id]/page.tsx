"use client";

// IMPORTS
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import Loader from "@/components/loader/page";
import { Posts } from "@/types/posts";
import { useEffect, useState } from "react";

export default function Post({ params }: { params: { id: string } }) {
  // STATES
  // Loader
  const [loading, setLoading] = useState<boolean>(true);
  // Post
  const [post, setPost] = useState<Posts | null>(null);

  // API CALL
  // Get post by ID
  const fetchPostData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.id}`
      );
      const data = await response.json();
      console.log(data);
      setPost(data);
    } catch (error) {
      console.log(
        `Impossible de récupérer les données du post ID=${params.id}`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <>
      <Header />
      <main>
        {loading ? (
          <Loader />
        ) : (
          post && (
            <article>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </article>
          )
        )}
      </main>
      <Footer />
    </>
  );
}
