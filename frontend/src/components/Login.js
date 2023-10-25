import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setAuthentication, isLogin } from '../utils/auth';
import { baseURL } from '../utils/constant';
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pageReady, setPageReady] = useState(false);

  const router = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router('/');
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    axios
      .post(`${baseURL}/login`, payload) // Replace 'baseURL' with your actual base URL
      .then((res) => {
        setAuthentication(res.data.token);
        toast.success('Login Successful');
        router('/');
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className={`${pageReady ? 'block' : 'hidden'} grid grid-cols-[1fr,30%]`}>
      <div className="h-screen grid place-items-center">
        <div className="text-center">
          <h1 className="text-accent font-bold text-4xl">
            Login to Your Account If Already Signed In
          </h1>
          

          

          <form
            className="flex w-[300px] mx-auto flex-col pt-2 gap-2"
            onSubmit={handleSubmit}
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input__style"
              type="email"
              placeholder="Email"
              required
              style={{ padding: '8px', marginRight: '10px' }}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input__style"
              type="password"
              placeholder="Password"
              required
              style={{ padding: '8px', marginRight: '10px' }}
            />

            <p>Forgot your password?</p>

            <button className="uppercase bg-accent px-4 py-2 text-white mt-4">
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="bg-accent h-screen grid place-items-center">
        <div className="text-center w-full text-white space-y-8">
          <h2 className="font-bold text-4xl">Hello Friend!</h2>
          <div className="text-[#eeeeee] w-fit mx-auto">
            <p>If New To App, Kindly Sign In To Start </p>
            

            <Link to="/signup">
              <button className="uppercase px-4 py-2 w-[100%] rounded-full border-2 mt-8">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
