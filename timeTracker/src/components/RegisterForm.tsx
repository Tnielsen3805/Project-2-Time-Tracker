
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const { register } = useAuthContext();
  const navigate = useNavigate();
  const { register: formRegister, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormInputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: SignupFormInputs) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await register(data.name, data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center  w-full min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="w-full max-w-md p-8 bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/30">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
        {errorMessage && <p className="text-red-400 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white">Name</label>
            <input type="text" {...formRegister("name", { required: "Name is required" })}
              className="w-full p-3 border border-white/40 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-300 outline-none" placeholder="Enter your name" />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input type="email" {...formRegister("email", { required: "Email is required" })}
              className="w-full p-3 border border-white/40 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-300 outline-none" placeholder="Enter your email" />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input type="password" {...formRegister("password", { required: "Password is required", minLength: { value: 6, message: "Must be at least 6 characters" } })}
              className="w-full p-3 border border-white/40 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-300 outline-none" placeholder="Enter your password" />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Confirm Password</label>
            <input type="password" {...formRegister("confirmPassword", { required: "Please confirm your password" })}
              className="w-full p-3 border border-white/40 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-300 outline-none" placeholder="Confirm your password" />
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-80 transition duration-300 ease-in-out" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-5 text-white text-sm">
          <p>Already have an account? <a href="/login" className="text-blue-200 hover:underline">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
