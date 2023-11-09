"use client";

// IMPORTS
import style from "./page.module.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Loader from "@/components/loader/page";
import { useEffect, useState } from "react";
import { Albums } from "@/types/albums";
import Link from "next/link";

export default function Albums() {
  // STATES
  //Loader
  const [loading, setLoading] = useState<boolean>(true);
  //Albums
  const [albums, setAlbums] = useState<Albums[]>([]);

  // API CALL
  // Get albums
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

  // USE EFFECT
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
            <Link
              className={style.album_card}
              key={album.id}
              href={`/albums/${album.id}`}
            >
              <h1 className={style.title}>{album.title}</h1>
            </Link>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
