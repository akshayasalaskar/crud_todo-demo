import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";
import { isLogin } from "../utils/auth";
import { baseURL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageReady, setPageReady] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router("/");
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
    };

    axios
      .post(`${baseURL}/signup`, payload)
      .then((res) => {
        toast.success(
          <div>
            Account Created Successfully <br /> Please Log in
          </div>
        );
        router("/login");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <div
        className={`${pageReady ? "block" : "hidden"} grid grid-cols-[30%,1fr]`}
      >
        <div className="bg-accent h-screen grid place-items-center">
          <div className="text-center w-full text-white space-y-8">
            <h2 className="font-bold text-4xl">Welcome Back!</h2>
            <div className="text-[#eeeeee] w-fit mx-auto">
              <p>To stay connected with us, please</p>
              <p>log in with your personal information.</p>

              <Link to="/login">
                <button className="uppercase px-4 py-2 w-[100%] rounded-full border-2 mt-8">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="h-screen grid place-items-center">
          <div className="text-center">
            <h1 className="text-accent font-bold text-4xl">Create Account</h1>
            <form
              className="flex w-[300px] mx-auto flex-col pt-2 gap-2"
              onSubmit={handleSubmit}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input__style"
                type="text"
                placeholder="Name"
                required
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input__style"
                type="email"
                placeholder="Email"
                required
                style={{ padding: '8px', marginRight: '10px', marginBottom: '10px' }}
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input__style"
                type="password"
                placeholder="Password"
                required
                style={{ padding: '8px', marginRight: '10px', marginBottom: '10px' }}
              />

              <button className="uppercase bg-accent hover:bg-accentDark px-4 py-2 text-white mt-4">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
