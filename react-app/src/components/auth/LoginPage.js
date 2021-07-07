
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './LoginPage.css'

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-element-container">
                <div>
                    <h2>
                        Log In To Play!
                    </h2>
                    <LoginForm />
                </div>
            </div>
            <div className="login-element-container">
                <h2>- or -</h2>
            </div>
            <div className="login-element-container">
                <div>
                    <h2>
                        Sign Up For a New Account!
                    </h2>
                    <SignUpForm />
                </div>
            </div>
      </div>
    )
}

export default LoginPage;