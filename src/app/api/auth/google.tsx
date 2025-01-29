import { GoogleLogin } from "@react-oauth/google";

import { CredentialResponse } from "@react-oauth/google";

const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
  const token = response.credential;

  try {
    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    console.log("User verified:", data.user);
  } catch (error) {
    console.error("Authentication error:", error);
  }
};

<GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => console.error("Login failed")} />
