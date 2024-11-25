import Image from "/auth.png";
import Logo from "/insta_logo.png";
import GoogleIcon from "/google.png";
import PlayStore from "/playstore.png";
import Microsoft from "/microsoft.png";

const LoginPage = () => {
  return (
    <div>
        {/* Img Section */}
        <div>
            <img src={Image} alt="Image" />
        </div>

        {/* Forms Section */}
        <div>
            {/* Login Form */}
            <div>
                {/* Logo */}
                <img src={Logo} alt="Logo" />
                
                {/* Form */}
                <form>
                    <input type="text" />
                    <input type="text" />
                    <button>Log in</button>
                </form>

                {/* Or */}
                <span>OR</span>

                {/* Login Google */}
                <div>
                    <img src={GoogleIcon} alt="GoogleIcon" />
                    <p>Log in with Google</p>
                </div>
            </div>

            {/* Change Form */}
            <div>
                <p>Don&apos;t have an account?</p>
                <span>Sign Up</span>
            </div>

            {/* Text */}
            <p>Get the app.</p>

            {/* Google or Microsoft */}
            <div>
                <img src={PlayStore} alt="PlayStore" />
                <img src={Microsoft} alt="Microsoft" />
            </div>
        </div>
    </div>
  )
}

export default LoginPage