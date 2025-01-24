"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";

const AuthModal = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const showAuthModal = () => {
      setTimeout(() => {
        setShowModal(true);
      }, 5000);
    };

    if (!session && status !== "loading") {
      const hasVisited = localStorage.getItem("hasVisited");
      if (!hasVisited) {
        showAuthModal();
      }
    }
  }, [session, status]);

  const handleSignIn = () => {
    signIn("google");
    localStorage.setItem("hasVisited", "true");
    setShowModal(false);
  };

  const handleClose = () => {
    localStorage.removeItem("hasVisited");
    setShowModal(false);
    setTimeout(() => {
      setShowModal(true);
    }, 20000);
  };

  if (session) return null; // Hide modal if user is authenticated

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#00000090] backdrop-blur-lg p-6 rounded-lg shadow-md text-center max-w-md">
          <header className="flex justify-between mb-4">
            <div className="text-[#fff]">
              <h2 className="text-lg font-bold mb-2">Welcome to Our Site</h2>
              <p className="mb-4">Sign in to unlock exclusive features!</p>
            </div>
            <Icon onClick={handleClose} className="ml-4 text-gray-600 underline cursor-pointer" icon="material-symbols-light:close-rounded" width="34" height="34"></Icon>
            {/* <button
              onClick={handleClose}
              
            >
              Close
            </button> */}
          </header>

          <button
            onClick={handleSignIn}
            className="bg-blue-600 text-[#0e0d0d] font-semibold px-4 py-2 rounded-lg w-full flex justify-center items-center gap-2"
          ><Icon icon="flat-color-icons:google" width="30" height="30"></Icon>
            Sign In with Google
          </button>
        </div>
      </div>
    )
  );
};

export default AuthModal;
