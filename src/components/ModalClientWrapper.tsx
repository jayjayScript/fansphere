// components/ClientWrapper.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import AuthModal from "./AuthModal";

export default function ModalClientWrapper({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <SessionProvider>
      {children}
      <AuthModal showModal={showModal} setShowModal={setShowModal} />
    </SessionProvider>
  );
}