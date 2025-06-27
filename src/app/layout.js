// src/app/layout.jsx
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "CRUD App",
  description: "Next.js MongoDB CRUD App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
