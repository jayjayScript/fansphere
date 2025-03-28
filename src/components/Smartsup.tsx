"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    smartsupp?: { init?: (options: Record<string, unknown>) => void; [key: string]: unknown };
    _smartsupp?: { key?: string };
  }
}

const SmartsuppChat = () => {
  useEffect(() => {
    // Check if script is already added to prevent duplication
    if (window.smartsupp) return;

    // Define Smartsupp object
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "7b14729e091dd82f31374107bcb0e87edca8d0ed"; // Your Smartsupp Key

    // Create script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js?";

    // Append script to the document
    document.body.appendChild(script);
  }, []);

  return (
    <div className="text-[#FFF] p-4 font-bold">chat</div>
  ); // No UI needed, just loads the script
};

export default SmartsuppChat;
