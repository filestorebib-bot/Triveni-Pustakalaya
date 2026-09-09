import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import Library from "./pages/Library";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="app">

      <Navbar />

      <main>
        <Routes>

          <Route path="/" element={<Home />} />

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
