import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import "@/App.css";
import { UserProvider } from "@/context/UserContext";
import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/Home";
import Archive from "@/pages/Archive";
import Collection from "@/pages/Collection";
import Quests from "@/pages/Quests";
import LeaderboardPage from "@/pages/LeaderboardPage";
import About from "@/pages/About";
import Admin from "@/pages/Admin";

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
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Navigate to="/collection" replace />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
