"use client";
import { usePathname } from "next/navigation";
// import Smartsupp from "@/components/Smartsup";
import SmartsuppChat from "@/components/Smartsup";


const ConditionalTawkToChat = () => {
  const pathname = usePathname();

  // Hide the widget on the launch page
  if (pathname === "/") {
    return null;
  }

  return <SmartsuppChat />;
};

export default ConditionalTawkToChat;