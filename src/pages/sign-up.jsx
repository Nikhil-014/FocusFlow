
import { SignUp } from '@clerk/react';

function SignUpPage() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Join FocusFlow</h1>
        <p>Start organizing your work and achieving more.</p>

        <SignUp />
      </div>
    </div>
  );
}

export default SignUpPage;
