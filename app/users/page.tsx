"use client";

import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import { useEffect, useState } from "react";
import { Users } from "@/types/users";

export default function Users() {
  const [users, setUsers] = useState<Users[]>([]);

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
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <>
      <Header />
      {users ? (
        users.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.website}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </>
  );
}
