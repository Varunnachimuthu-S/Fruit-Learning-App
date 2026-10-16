import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

// Class Component - Traditional React component using ES6 class syntax
class Navigation extends Component {
  constructor(props) {
    super(props);
    // Initialize state in constructor
    this.state = {
      isMenuOpen: false
    };
  }

  // Method to check if path is active
  isActive = (path) => {
    return window.location.pathname === path;
  };

  // Method to toggle menu (arrow function for auto-binding)
  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  // Method to close menu
  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  // Render method - required in class components
  render() {
    const { isMenuOpen } = this.state;

    return (
      <nav
        className="main-navigation"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={this.closeMenu}>
            <span style={{ fontSize: "1.5em", marginRight: "0.3em" }}>🍎</span>
            Fruit Garden
          </Link>

          <button
            className="hamburger-button"
            onClick={this.toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <ul
            className={`nav-menu ${isMenuOpen ? "nav-menu-open" : ""}`}
            id="nav-menu"
          >
            <li>
              <Link
                to="/"
                className={`nav-link ${this.isActive("/") ? "active" : ""}`}
                aria-current={this.isActive("/") ? "page" : undefined}
                onClick={this.closeMenu}
              >
                🏠 Home
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className={`nav-link ${this.isActive("/gallery") ? "active" : ""}`}
                aria-current={this.isActive("/gallery") ? "page" : undefined}
                onClick={this.closeMenu}
              >
                🖼️ Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/matching"
                className={`nav-link ${this.isActive("/matching") ? "active" : ""}`}
                aria-current={this.isActive("/matching") ? "page" : undefined}
                onClick={this.closeMenu}
              >
                🎯 Matching Game
              </Link>
            </li>
            <li>
              <Link
                to="/quiz"
                className={`nav-link ${this.isActive("/quiz") ? "active" : ""}`}
                aria-current={this.isActive("/quiz") ? "page" : undefined}
                onClick={this.closeMenu}
              >
                ❓ Quiz
              </Link>
            </li>
            <li>
              <Link
                to="/add-fruit"
                className={`nav-link ${this.isActive("/add-fruit") ? "active" : ""}`}
                aria-current={this.isActive("/add-fruit") ? "page" : undefined}
                onClick={this.closeMenu}
              >
                ➕ Add Fruit
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
