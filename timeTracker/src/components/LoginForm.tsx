import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";

interface AuthFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthFormInputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: AuthFormInputs) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
<div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-purple-500 to-blue-500">
  <div className="w-full max-w-md p-8 bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/30">
    <h2 className="text-3xl font-bold text-center text-white mb-6">Sign In</h2>

    {errorMessage && <p className="text-red-400 text-center mb-4">{errorMessage}</p>}

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-white">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-3 border border-white/40 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full p-3 border border-white/40 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-80 transition duration-300 ease-in-out"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>

    <div className="text-center mt-5 text-white text-sm">
      <p>
        Don't have an account?{" "}
        <a href="/register" className="text-blue-200 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  </div>
</div>


  );
};

export default LoginForm;
