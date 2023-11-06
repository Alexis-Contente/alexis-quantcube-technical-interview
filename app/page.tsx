"use client";

import CardList from "@/components/cardList/page";
import { useEffect, useState } from "react";

type Posts = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default function Home() {
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
      {posts ? (
        posts.map((post) => (
          <CardList key={post.id} title={post.title} body={post.body} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
