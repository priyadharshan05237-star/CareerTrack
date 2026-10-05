import "./App.css";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Companies from "./pages/Companies";
import Applications from "./pages/Applications";
import Preparation from "./pages/Preparation";

function App() {
  const [page, setPage] = useState("home");

  const [applications, setApplications] = useState([]);

  const [selectedCompany, setSelectedCompany] = useState(null);

  // ---------------- LOGIN ----------------

  if (page === "login") {
    return (
      <Login
        onRegister={() => setPage("register")}
        onLogin={() => setPage("dashboard")}
      />
    );
  }

  // ---------------- REGISTER ----------------

  if (page === "register") {
    return (
      <Register
        onLogin={() => setPage("login")}
      />
    );
  }

  // ---------------- DASHBOARD ----------------

  if (page === "dashboard") {
    return (
      <Dashboard
        goProfile={() => setPage("profile")}
        goCompanies={() => setPage("companies")}
        goApplications={() => setPage("applications")}
        goPreparation={() => setPage("preparation")}
        goHome={() => setPage("home")}
      />
    );
  }

  // ---------------- PROFILE ----------------

  if (page === "profile") {
    return (
      <Profile
        goDashboard={() => setPage("dashboard")}
      />
    );
  }

  // ---------------- COMPANIES ----------------

  if (page === "companies") {
    return (
      <Companies
        goDashboard={() => setPage("dashboard")}
        goApplications={(company) => {
          setSelectedCompany(company);
          setPage("applications");
        }}
      />
    );
  }

  // ---------------- APPLICATIONS ----------------

  if (page === "applications") {
    return (
      <Applications
        goDashboard={() => setPage("dashboard")}
        applications={applications}
        setApplications={setApplications}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
    );
  }

  // ---------------- PREPARATION ----------------

  if (page === "preparation") {
    return (
      <Preparation
        goDashboard={() => setPage("dashboard")}
      />
    );
  }

  // ---------------- HOME ----------------

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          <h2>CareerTrack</h2>
        </div>

        <div className="nav-links">

          <button
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            onClick={() => setPage("companies")}
          >
            Companies
          </button>

          <button
            onClick={() => setPage("preparation")}
          >
            Preparation
          </button>

          <button
            onClick={() => setPage("login")}
          >
            Login
          </button>

        </div>

      </nav>

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            🎯 Student Placement Platform
          </span>

          <h1>
            Build Your Career.
            <br />
            Track Your Placement.
          </h1>

          <p>
            CareerTrack helps students manage their
            placement journey, prepare for interviews,
            explore companies and track applications
            in one place.
          </p>

          <div className="hero-buttons">

            <button
              className="start-btn"
              onClick={() => setPage("login")}
            >
              Get Started →
            </button>

            <button
              className="explore-btn"
              onClick={() => setPage("companies")}
            >
              Explore Companies
            </button>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="features">

        <div className="features-header">

          <span>CAREER PREPARATION</span>

          <h2>
            Everything You Need for Placements
          </h2>

          <p>
            Manage your complete placement journey
            from one platform.
          </p>

        </div>

        <div className="cards">

          <div
            className="card"
            onClick={() => setPage("companies")}
          >
            <div className="card-icon">
              🏢
            </div>

            <h3>
              Placement Tracking
            </h3>

            <p>
              Explore companies, job roles and
              placement opportunities.
            </p>
          </div>

          <div
            className="card"
            onClick={() => setPage("preparation")}
          >
            <div className="card-icon">
              📚
            </div>

            <h3>
              Placement Preparation
            </h3>

            <p>
              Practice aptitude, Java, DSA,
              coding and interview questions.
            </p>
          </div>

          <div
            className="card"
            onClick={() => setPage("applications")}
          >
            <div className="card-icon">
              📊
            </div>

            <h3>
              Application Tracking
            </h3>

            <p>
              Track your applications from
              Applied to Selection.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default App;