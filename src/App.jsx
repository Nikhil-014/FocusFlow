import Dashboard from "./components/Dashboard";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import Auth from "./components/Auth";
import SignIn from "./components/SignIn";
import "./App.css";

// Check Supabase connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error("Supabase connection error:", error.message);
  } else {
    console.log("Supabase connected successfully!");
    console.log("Session:", data.session);
  }
});

function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Restore the user's session when the application loads
useEffect(() => {
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error("Session error:", error.message);
      return;
    }

    setLoggedInUser(data.session?.user ?? null);
});

  // Listen for login and logout events
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setLoggedInUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);

// Show Dashboard after login
if (loggedInUser) {
  return (
    <Dashboard
      user={loggedInUser}
      onSignOut={() => {
        setLoggedInUser(null);
        setShowAuth(false);
        setShowSignIn(false);
      }}
    />
  );
}

  // Show Sign Up page
  if (showAuth) {
    return (
      <Auth
        onBack={() => setShowAuth(false)}
        onSignIn={() => {
          setShowAuth(false);
          setShowSignIn(true);
        }}
      />
    );
  }

  // Show Sign In page
  if (showSignIn) {
    return (
      <SignIn
        onBack={() => setShowSignIn(false)}
        onSignUp={() => {
          setShowSignIn(false);
          setShowAuth(true);
        }}
        onSignedIn={(user) => {
          setLoggedInUser(user);
          setShowSignIn(false);
        }}
      />
    );
  }

  return (
    <div className="website">

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          Focus<span>Flow.</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">How it works</a>
          <a href="#pricing">Pricing</a>
        </div>

        <a
          href="#signup"
          className="nav-button"
          onClick={(e) => {
            e.preventDefault();
            setShowAuth(true);
          }}
        >
          Get Started
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            ✨ YOUR PRODUCTIVITY PARTNER
          </span>

          <h1>
            Work smarter.
            <br />
            Achieve <span>more.</span>
          </h1>

          <p>
            FocusFlow helps you organize your tasks,
            manage your time, and achieve your goals
            without the stress.
          </p>

          <div className="hero-buttons">
            <a
              href="#signup"
              className="primary-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowAuth(true);
              }}
            >
              Get Started →
            </a>

            <a href="#features" className="secondary-btn">
              Explore Features
            </a>
          </div>

          <div className="hero-note">
            ✓ Simple to use ✓ Made for productivity
          </div>
        </div>

        {/* Dashboard Illustration */}
        <div className="hero-visual">
          <div className="dashboard">
            <div className="dashboard-header">
              <h3>My Dashboard</h3>
              <span>● Online</span>
            </div>

            <p className="dashboard-subtitle">
              Welcome back! Here's your progress.
            </p>

            <div className="stats">
              <div className="stat-card">
                <small>Total Tasks</small>
                <h2>24</h2>
              </div>

              <div className="stat-card">
                <small>Completed</small>
                <h2>18</h2>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-heading">
                <strong>Weekly Progress</strong>
                <span>75%</span>
              </div>

              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>

            <div className="task">
              <span>✓</span> Complete project design
            </div>

            <div className="task">
              <span>✓</span> Review weekly goals
            </div>

            <div className="task pending">
              <span>○</span> Prepare presentation
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-heading">
          <span className="section-tag">OUR FEATURES</span>

          <h2>
            Everything you need to
            <span> stay productive.</span>
          </h2>

          <p>
            Powerful tools designed to make your
            everyday work easier and more organized.
          </p>
        </div>

        <div className="feature-container">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Smart Task Management</h3>
            <p>
              Organize your daily tasks, set priorities,
              and keep everything in one place.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>
              Track completed tasks and understand
              how productive you are every day.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Time Management</h3>
            <p>
              Plan your schedule and focus on
              the activities that matter most.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="about">
        <div className="section-heading">
          <span className="section-tag">HOW IT WORKS</span>

          <h2>
            Get started in
            <span> three simple steps.</span>
          </h2>

          <p>
            Start managing your work better with
            a simple and easy process.
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Create Your Account</h3>
            <p>
              Sign up and get started with your
              personal productivity workspace.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Add Your Tasks</h3>
            <p>
              Create tasks, set priorities,
              and organize your daily activities.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Track Your Progress</h3>
            <p>
              Monitor your progress and
              achieve your productivity goals.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="section-heading">
          <span className="section-tag">OUR PRICING</span>

          <h2>
            Simple pricing.
            <span> No surprises.</span>
          </h2>

          <p>
            Choose the perfect plan to improve
            your everyday productivity.
          </p>
        </div>

        <div className="pricing-container">

          {/* Free Plan */}
          <div
            className={`price-card ${
              selectedPlan === "Free" ? "selected" : ""
            }`}
          >
            <h3>Free Plan</h3>

            <p className="plan-description">
              Perfect for getting started.
            </p>

            <h2>₹0 <small>/ month</small></h2>

            <ul>
              <li>✓ Basic Task Management</li>
              <li>✓ Progress Tracking</li>
              <li>✓ Daily Task Planning</li>
            </ul>

            <button
              className="price-btn"
              aria-pressed={selectedPlan === "Free"}
              onClick={() => setSelectedPlan("Free")}
            >
              {selectedPlan === "Free"
                ? "Selected ✓"
                : "Choose Free"}
            </button>
          </div>

          {/* Pro Plan */}
          <div
            className={`price-card ${
              selectedPlan === "Pro" ? "selected" : ""
            }`}
          >
            <span className="popular-tag">MOST POPULAR</span>

            <h3>Pro Plan</h3>

            <p className="plan-description">
              For people who want more.
            </p>

            <h2>₹299 <small>/ month</small></h2>

            <ul>
              <li>✓ Everything in Free</li>
              <li>✓ Advanced Analytics</li>
              <li>✓ Priority Support</li>
              <li>✓ Unlimited Tasks</li>
            </ul>

            <button
              className="price-btn"
              aria-pressed={selectedPlan === "Pro"}
              onClick={() => setSelectedPlan("Pro")}
            >
              {selectedPlan === "Pro"
                ? "Selected ✓"
                : "Choose Pro"}
            </button>
          </div>
        </div>

        {selectedPlan && (
          <p className="selection-message">
            You selected the {selectedPlan} Plan!
          </p>
        )}
      </section>
    </div>
  );
}

export default App;
