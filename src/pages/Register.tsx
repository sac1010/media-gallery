import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

interface FormData {
  userName: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    password: "",
  });
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: formData.userName,
        authProvider: "local",
        email: formData.email,
      });
      console.log(user);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
    <div className="w-full h-screen bg-gray-800 flex items-center justify-center">
    <img src="/bg.jpg" className="w-1/2 h-screen object-fill" alt="" />
      <div className="w-1/2 h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          name="userName"
          placeholder="User Name"
          value={formData.userName}
          onChange={handleChange}
          className="bg-gray-600 px-2 w-[250px] h-10 rounded text-white"
          type="text"
        />
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
          Register
        </button>
        <Link to={"/login"} className="text-white w-full text-center">
          Login
        </Link>
      </form>
        </div>
    </div>
    {loading && <Spinner/>}
    </>
  );
};

export default Register;
