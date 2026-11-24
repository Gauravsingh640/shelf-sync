
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userBaseUrl } from "../../axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    Email: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userAuth = JSON.parse(
        localStorage.getItem("userAuth") || "null"
      );

      if (userAuth?.isLogin && userAuth?.token) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      localStorage.removeItem("userAuth");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginForm.Email.trim() || !loginForm.Password.trim()) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const { data } = await userBaseUrl.post("/login", loginForm);

      console.log("login-response", data);

      if (data?.success && data?.token) {
        const authData = {
          isLogin: true,
          token: data.token,
        };

        localStorage.setItem("userAuth", JSON.stringify(authData));

        toast.success("Login successful!");

        navigate("/", { replace: true });
      } else {
        toast.error(data?.message || "Invalid email or password");
      }
    } catch (error) {
      console.log("login-err", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.Message ||
        error?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="Email"
              value={loginForm.Email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="Password"
              value={loginForm.Password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
