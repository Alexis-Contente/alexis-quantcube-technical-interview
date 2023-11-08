"use client";

// IMPORTS
import style from "./page.module.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Loader from "@/components/loader/page";
import { useEffect, useState } from "react";
import { Todos } from "@/types/todos";

export default function Todos() {
  // STATES
  // Loader
  const [loading, setLoading] = useState<boolean>(true);
  // Todos
  const [todos, setTodos] = useState<Todos[]>([]);

  // API CALL
  const fetchTodosData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      console.log("Todos: ", data);
      setTodos(data);
    } catch (error) {
      console.log("Impossible de récupérer les données Todos de l'API", error);
    } finally {
      setLoading(false);
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchTodosData();
  }, []);

  return (
    <>
      <Header />
      <main className={style.main}>
        {loading ? (
          <Loader />
        ) : (
          todos.map((todo) => (
            <div key={todo.id}>
              <h1>{todo.title}</h1>
            </div>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
