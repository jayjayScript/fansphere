"use client";
import { usePathname } from "next/navigation";
import TawkToChat from "@/components/TawkToChat";

const ConditionalTawkToChat = () => {
  const pathname = usePathname();

  // Hide the widget on the launch page
  if (pathname === "/") {
    return null;
  }

  return <TawkToChat />;
};

export default ConditionalTawkToChat;