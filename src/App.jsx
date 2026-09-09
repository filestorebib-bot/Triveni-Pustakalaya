import { useEffect } from "react";
import { syncAllData } from "./services/sync";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import Library from "./pages/Library";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  /*
  ========================================
  AUTOMATIC DATA SYNC
  ========================================
  */

  useEffect(() => {
    // Sync latest data when the app opens
    syncAllData();

    // Sync latest data when internet comes back
    const handleOnline = () => {
      console.log(
        "Internet restored - downloading latest Triveni Pustakalaya data..."
      );

      syncAllData();
    };

    window.addEventListener("online", handleOnline);

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <div className="app">

      <Navbar />

      <main>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/subjects"
            element={<Subjects />}
          />

          <Route
            path="/library"
            element={<Library />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;
