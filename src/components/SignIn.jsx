
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "./SignIn.css";

function SignIn({ onBack, onSignUp, onSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      // Remove any old email-confirmation error from the URL
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

      // Send the logged-in user to App.jsx
      onSignedIn(data.user);

    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to Home
        </button>

        <div className="auth-logo">
          Focus<span>Flow.</span>
        </div>

        <h1>Welcome Back!</h1>

        <p className="auth-subtitle">
          Sign in to continue your productivity journey.
        </p>

        <form onSubmit={handleSignIn}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <p className="auth-footer">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSignUp}
            className="auth-link"
          >
            Create Account
          </button>
        </p>

      </div>
    </div>
  );
}

export default SignIn;
