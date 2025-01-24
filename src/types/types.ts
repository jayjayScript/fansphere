// src/types.ts
export interface Message {
  sender: string;
  message: string;
  role: "user" | "admin"; 
  timestamp?: Date; // Optional timestamp
}