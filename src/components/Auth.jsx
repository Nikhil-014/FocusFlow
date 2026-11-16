import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "./Auth.css";

function Auth({ onBack, onSignIn }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.session) {
      setMessage("Account created successfully!");
    } else {
      setMessage("Account created! Please check your email to verify your account.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>

        <div className="auth-logo">
          Focus<span>Flow.</span>
        </div>

        <h1>Create your account</h1>
        <p className="auth-subtitle">
          Start your productivity journey with FocusFlow.
        </p>

        <form onSubmit={handleSignUp}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-footer">
         Already have an account?{" "}
        <button type="button" className="auth-link" onClick={onSignIn}>
          Sign In
      </button>
</p>
      </div>
    </div>
  );
}

export default Auth;
