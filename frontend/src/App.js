import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Landing from "@/pages/Landing";
import Admin from "@/pages/Admin";
import { UserProvider } from "@/context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: "#0d1017",
              border: "1px solid #1b2234",
              color: "#f0f6fc",
              fontFamily: "Outfit, sans-serif",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
