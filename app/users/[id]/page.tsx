"use client";

// IMPORTS
import Header from "@/components/header/page";
import style from "./page.module.css";
import Footer from "@/components/footer/page";
import { useEffect, useState } from "react";
import { Users } from "@/types/users";
import Loader from "@/components/loader/page";

export default function UserById({ params }: { params: { id: string } }) {
  // STATES
  // Loader
  const [loading, setLoading] = useState(true);

  // User by id
  const [userById, setUserById] = useState<Users | null>(null);

  // Todos by userId
  const [todosById, setTodosById] = useState<Users[]>([]);

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

  // Get todos by user id
  const fetchTodosById = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${params.id}`
      );
      const data = await response.json();
      console.log("Todos by ID: ", data);
      setTodosById(data);
    } catch (error) {
      console.log(
        `Impossible de récupérer les datas des todos de l'user id ${params.id}`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchUserById();
    fetchTodosById();
  }, []);

  return (
    <>
      <Header />
      <main className={style.main}>
        {loading ? (
          <Loader />
        ) : (
          <div className={style.user_card}>
            {userById && (
              <>
                <h1>{userById.name}</h1>
                <p>{userById.email}</p>
                <p>{userById.phone}</p>
                <p>{userById.website}</p>
                <details>
                  <summary>Address</summary>
                  <>
                    <p>{userById.address.street}</p>
                    <p>{userById.address.suite}</p>
                    <p>{userById.address.city}</p>
                    <p>{userById.address.zipcode}</p>
                  </>
                </details>
                <details>
                  <summary>Company</summary>
                  <>
                    <p>{userById.company.name}</p>
                    <p>{userById.company.catchPhrase}</p>
                    <p>{userById.company.bs}</p>
                  </>
                </details>
              </>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
