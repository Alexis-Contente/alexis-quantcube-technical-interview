"use client";

import style from "./page.module.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Loader from "@/components/loader/page";
import { Todos } from "@/types/todos";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TodosByUserId({ params }: { params: { id: string } }) {
  // STATES
  // Loader
  const [loading, setLoading] = useState(true);

  // Todos by userId
  const [todosByUserId, setTodosByUserId] = useState<Todos[]>([]);

  // Get todos by user id
  const fetchTodosByUserId = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${params.id}`
      );
      const data = await response.json();
      console.log("Todos by ID: ", data);
      setTodosByUserId(data);
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
    fetchTodosByUserId();
  }, []);

  return (
    <>
      <Header />
      <main>
        {loading ? (
          <Loader />
        ) : (
          <div className={style.todo_container}>
            {todosByUserId.map((todo) => (
              <p className={style.title} key={todo.id}>
                {todo.title}{" "}
                {todo.completed ? (
                  <Image
                    src="/done.png"
                    alt="Icone validé"
                    width={14}
                    height={14}
                  />
                ) : (
                  <Image
                    src="/not-done.png"
                    alt="Icone validé"
                    width={14}
                    height={14}
                  />
                )}
              </p>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
