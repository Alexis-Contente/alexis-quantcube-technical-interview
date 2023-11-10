"use client";

// IMPORTS
import style from "./page.module.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Loader from "@/components/loader/page";
import { useEffect, useState } from "react";
import { Users } from "@/types/users";
import Link from "next/link";
import Image from "next/image";

export default function Users() {
  // STATES
  // Loader
  const [loading, setLoading] = useState(true);
  // Users
  const [users, setUsers] = useState<Users[]>([]);

  // API CALL
  // Get users
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
          <div className={style.user_card_container}>
            {users.map((user) => (
              <Link
                className={style.user_card}
                key={user.id}
                href={`/users/${user.id}`}
              >
                <h1 className={style.name}>{user.name}</h1>
                <div className={style.email}>
                  <Image
                    src="/icon-email.svg"
                    alt="Icône email"
                    width={15}
                    height={15}
                    className={style.icon}
                  />{" "}
                  <p className={style.text}>{user.email}</p>
                </div>
                <div className={style.phone}>
                  <Image
                    src="/icon-phone.svg"
                    alt="Icône phone"
                    width={15}
                    height={15}
                    className={style.icon}
                  />{" "}
                  <p className={style.text}>{user.phone}</p>
                </div>
                <div className={style.website}>
                  <Image
                    src="/icon-website.svg"
                    alt="Icône website"
                    width={15}
                    height={15}
                    className={style.icon}
                  />{" "}
                  <p className={style.text}>{user.website}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
