"use client";

// IMPORTS
import Header from "@/components/header/page";
import style from "./page.module.css";
import Footer from "@/components/footer/page";
import { useEffect, useState } from "react";
import { Users } from "@/types/users";
import { Todos } from "@/types/todos";
import { Posts } from "@/types/posts";
import Loader from "@/components/loader/page";
import Link from "next/link";

export default function UserById({ params }: { params: { id: string } }) {
  // STATES
  // Loader
  const [loading, setLoading] = useState(true);

  // User by id
  const [userById, setUserById] = useState<Users | null>(null);

  // Posts by userId
  const [postsByUserId, setPostsByUserId] = useState<Posts[]>([]);

  // CALL API
  // Get user by id
  const fetchUserById = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${params.id}`
      );
      const data = await response.json();
      console.log("User by ID: ", data);
      setUserById(data);
    } catch (error) {
      console.log(
        `Impossible de récupérer les datas de l'user id ${params.id}`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

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
    fetchUserById();
    fetchPostsByUserId();
  }, []);

  return (
    <>
      <Header />
      <main className={style.main}>
        {loading ? (
          <Loader />
        ) : (
          <div className={style.card_container}>
            {userById && (
              <>
                <div className={style.user_card}>
                  <h1>{userById.name}</h1>
                  <p>{userById.email}</p>
                  <p>{userById.phone}</p>
                  <p>{userById.website}</p>
                  <h3>Address</h3>
                  <p>{userById.address.street}</p>
                  <p>{userById.address.suite}</p>
                  <p>{userById.address.city}</p>
                  <p>{userById.address.zipcode}</p>
                  <h3>Company</h3>
                  <p>{userById.company.name}</p>
                  <p>{userById.company.catchPhrase}</p>
                  <p>{userById.company.bs}</p>
                </div>
                <Link href={`/users/todos/${params.id}`}>Todos</Link>
                <h3>Posts</h3>
                <>
                  {postsByUserId.map((post) => (
                    <div className={style.post_card} key={post.id}>
                      <p>{post.title}</p>
                    </div>
                  ))}
                </>
              </>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
