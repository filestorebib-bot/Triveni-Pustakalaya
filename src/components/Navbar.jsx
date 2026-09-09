import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  Menu,
  X,
  BookOpen
} from "lucide-react";

import InstallButton from "./InstallButton";

function Navbar() {

  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="navbar">

      <div className="nav-container">

        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >

          <img
            src="/tv.png"
            alt="Triveni Pustakalaya"
            className="brand-logo"
          />

          <div>
            <strong>Triveni Pustakalaya</strong>
            <span>Educational Library</span>
          </div>

        </Link>

        <button
          className="mobile-menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={27} /> : <Menu size={27} />}
        </button>

        <nav className={`nav-links ${open ? "active" : ""}`}>

          <NavLink
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/subjects"
            onClick={closeMenu}
          >
            Subjects
          </NavLink>

          <NavLink
            to="/library"
            onClick={closeMenu}
          >
            Library
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          <InstallButton />

        </nav>

      </div>

    </header>
  );
}

export default Navbar;
