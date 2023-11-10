"use client";

// IMPORTS
import style from "./page.module.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Photos } from "@/types/photos";

export default function Album({ params }: { params: { id: string } }) {
  // STATES
  //Loader
  const [loading, setLoading] = useState<boolean>(true);
  //Album by Id
  const [photosById, setPhotosById] = useState<Photos[]>([]);

  // API CALL
  // Get album by id
  const fetchAlbumById = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${params.id}`
      );
      const data = await response.json();
      console.log("Album by ID: ", data);
      setPhotosById(data);
    } catch (error) {
      console.log(
        `Impossible de récupérer les datas de l'album id ${params.id}`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchAlbumById();
  }, []);

  return (
    <>
      <Header />
      <main className={style.main}>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          photosById.map((photo) => (
            <div key={photo.id}>
              <Image
                src={photo.thumbnailUrl}
                alt={photo.title}
                width={150}
                height={150}
              />
            </div>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
