import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <ThemeProvider>
      <BookingProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/booking" element={<BookingPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </BookingProvider>
    </ThemeProvider>
  );
}

export default App;
