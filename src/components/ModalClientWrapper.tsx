// components/ClientWrapper.tsx
"use client";
import { ReactNode, useState } from "react";
import AuthModal from "./AuthModal";

export default function ModalClientWrapper({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {children}
      <AuthModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}