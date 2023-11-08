"use client";

import style from "./page.module.css";
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import { useEffect, useState } from "react";
import { Albums } from "@/types/albums";
import Loader from "@/components/loader/page";

export default function Albums() {
  const [loading, setLoading] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Albums[]>([]);

  const fetchAlbumsData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const data = await response.json();
      console.log("Albums: ", data);
      setAlbums(data);
    } catch (error) {
      console.log("Impossible de récupérer les données Albums de l'API", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbumsData();
  }, []);

  return (
    <>
      <Header />
      <main className={style.main}>
        {loading ? (
          <Loader />
        ) : (
          albums.map((album) => (
            <div key={album.id}>
              <h1>{album.title}</h1>
            </div>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
