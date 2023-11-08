"use client";

// IMPORTS
import style from "./page.module.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Loader from "@/components/loader/page";
import { useEffect, useState } from "react";
import { Users } from "@/types/users";

export default function Users() {
  // STATES
  // Loader
  const [loading, setLoading] = useState(true);
  // Users
  const [users, setUsers] = useState<Users[]>([]);

  // API CALL
  const fetchUsersData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      console.log("Users: ", data);
      setUsers(data);
    } catch (error) {
      console.log("Impossible de récupérer les données Users de l'API", error);
    } finally {
      setLoading(false);
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <>
      <Header />
      <main className={style.main}>
        {loading ? (
          <Loader />
        ) : (
          users.map((user) => (
            <div className={style.user_card} key={user.id}>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.website}</p>
              <details>
                <summary>Address</summary>
                <>
                  <p>{user.address.street}</p>
                  <p>{user.address.suite}</p>
                  <p>{user.address.city}</p>
                  <p>{user.address.zipcode}</p>
                </>
              </details>
              <details>
                <summary>Company</summary>
                <>
                  <p>{user.company.name}</p>
                  <p>{user.company.catchPhrase}</p>
                  <p>{user.company.bs}</p>
                </>
              </details>
            </div>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
