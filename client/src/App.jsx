import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./components/Lobby";
import ChatRoom from "./components/ChatRoom";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/chat/:id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}
