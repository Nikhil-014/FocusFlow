
import { SignIn } from '@clerk/react';

function SignInPage() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Welcome Back!</h1>
        <p>Sign in to continue your productivity journey.</p>

        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
