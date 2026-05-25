import { useState, useEffect } from "react";
import s1 from "/src/assets/FedEx.png";
import "./login.css";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const expiryDate = localStorage.getItem("expiryDate");

  if (expiryDate && new Date(expiryDate) > new Date()) {
    navigate("/home");
  }

  const [typedText, setTypedText] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const fullText = "Sign up for an account";

  useEffect(() => {
    const typingAnimation = setInterval(() => {
      if (typedText !== fullText) {
        setTypedText((prevTypedText) => {
          const nextChar = fullText[prevTypedText.length];
          return prevTypedText + nextChar;
        });
      } else {
        clearInterval(typingAnimation);
      }
    }, 100);
    return () => clearInterval(typingAnimation);
  }, [typedText, fullText]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.state) {
          const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 5);
          localStorage.setItem("jwtToken", data.jwtToken);
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          localStorage.setItem("uid", data.tokenObject._id);
          navigate("/");
        } else {
          setMsg(data.message);
          setTimeout(() => {
            setMsg("");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  const authgoogle = (parobj) => {
    fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parobj),
    })
      .then((response) => response.json())
      .then((data) => {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 5);
        if (data.state) {
          localStorage.setItem("jwtToken", data.jwtToken);
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          localStorage.setItem("uid", data.tokenObject._id);
          if (localStorage.getItem("expiryDate")) {
            navigate("/home");
          }
        } else {
          setMsg(data.message);
          setTimeout(() => {
            setMsg("");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105">
        
      {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
              <p className="mt-3 text-gray-600">Authenticating...</p>
            </div>
          </div>
        )}
        <div className="px-6 py-8">
          <div className="flex justify-center">
            <img className="h-12 w-auto logo animate-spin-slow" src={s1} alt="Logo" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {typedText}
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="sr-only">
                Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              >
                Sign up
              </button>
            </div>
            <div className="my-3 flex justify-center">
              <GoogleOAuthProvider clientId="1001842428391-mqsjkn629ce6hohe81ulluvltg36ckhh.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    const password = Math.floor(10000 + Math.random() * 90000).toString().substring(0, 5);
                    const parobj = {
                      email: decoded.email,
                      email_verified: decoded.email_verified,
                      fullName: decoded.given_name,
                      password: password,
                    };
                    authgoogle(parobj);
                  }}
                  onError={() => {
                    setMsg("Something Went Wrong!");
                    setTimeout(() => {
                      setMsg("");
                    }, 3000);
                  }}
                />
              </GoogleOAuthProvider>
            </div>
            <div className="flex justify-center my-7">
              {msg && <p className="text-red-600 font-semibold">{msg}</p>}
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm my-6">
              <Link to="/login" className="font-medium text-orange-700 hover:text-orange-500">
                Already have an account? | Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
