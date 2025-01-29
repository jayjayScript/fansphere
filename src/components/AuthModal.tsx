"use client";

import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Icon } from "@iconify/react/dist/iconify.js";


interface AuthModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const AuthModal = ({ showModal, setShowModal }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  interface User {
    id: string;
    name: string;
    email: string;
    // Add other user properties here
  }

  const [user, setUser] = useState<User | null>(null); // Store user data

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user if already logged in
      return;
    }

    const showAuthModal = () => {
      setTimeout(() => {
        setShowModal(true);
      }, 120000); // Show modal after 2 minutes
    };

    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      showAuthModal();
    }
  }, [setShowModal]);

  const handleSignIn = async (response: import("@react-oauth/google").CredentialResponse) => {
    if (!response.credential) {
      console.error("No credential received");
      return;
    }
  
    setIsLoading(true);
    const token = response.credential;
  
    try {
      const res = await fetch("https://artistbackend.onrender.com/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
  
      const data = await res.json();
      console.log('Backend response:', data);  // Add this line to inspect the response
  
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setShowModal(false);
      } else {
        console.error("User data not found in response");
      }
    } catch (error) {
      console.error("Authentication failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleClose = () => {
    localStorage.setItem("hasVisited", "true");
    setShowModal(false);
  };

  if (user) return null; // Hide modal if user is authenticated

  return (
    showModal && (
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#00000090] backdrop-blur-lg p-6 rounded-lg shadow-md text-center max-w-md">
            <header className="flex justify-between mb-4">
              <div className="text-[#fff]">
                <h2 className="text-lg font-bold mb-2">Welcome to Our Site</h2>
                <p className="mb-4">Sign in to unlock exclusive features!</p>
              </div>
              <Icon
                onClick={handleClose}
                className="ml-4 text-gray-600 underline cursor-pointer"
                icon="material-symbols-light:close-rounded"
                width="34"
                height="34"
              />
            </header>

            <GoogleLogin
              onSuccess={handleSignIn}
              onError={() => console.log("Login Failed")}
            />

            {isLoading && <p className="animate-spin text-white">Signing In...</p>}
          </div>
        </div>
      </GoogleOAuthProvider>
    )
  );
};

export default AuthModal;
