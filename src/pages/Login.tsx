import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      navigate("/");
      console.log(user);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-800 flex items-center justify-around">
      <img src="/bg.jpg" className="w-1/2 h-screen object-fill" alt="" />
      <div className="w-1/2 h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-600 px-2 w-[250px] h-10 rounded text-white"
            type="text"
          />
          <input
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="bg-gray-600 px-2 w-[250px] h-10 rounded text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <Link to={"/register"} className="text-white w-full text-center">
            not a member? Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
