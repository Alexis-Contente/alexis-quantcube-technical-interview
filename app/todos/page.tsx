"use client";

import style from "./page.module.css";
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import { useEffect, useState } from "react";
import { Todos } from "@/types/todos";

export default function Todos() {
  const [todos, setTodos] = useState<Todos[]>([]);

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
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, []);

  return (
    <>
      <Header />
      <main className={style.main}>
        {todos ? (
          todos.map((todo) => (
            <div key={todo.id}>
              <h1>{todo.title}</h1>
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
