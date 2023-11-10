"use client";

import Footer from "@/components/footer/page";
import Header from "@/components/header/page";

export default function PostsByUserId({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
