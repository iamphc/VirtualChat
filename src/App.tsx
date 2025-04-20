import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Settings from "./pages/Settings/Settings";
import CreateCharacter from "./pages/CreateCharacter/CreateCharacter";
import MainLayout from "./components/layout/MainLayout";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/create-character" element={<CreateCharacter />} />
            </Routes>
          </MainLayout>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
