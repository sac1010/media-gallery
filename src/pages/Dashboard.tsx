import React, { useEffect, useState } from "react";
import logout from "../assets/logout.svg";
import Modal from "../components/Modal";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import Sidebar from "../components/Sidebar";
import Upload from "../components/Upload";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {};

const Dashboard = (props: Props) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, [user, loading]);

  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <div className="w-full h-screen bg-gray-200 flex ">
      <Sidebar />
      <div className="w-10/12 h-screen pt-16 p-4 grid grid-cols-12 gap-6 relative">
        {name && (
          <div className="absolute top-3 left-4 text-xl font-semibold">
            {`Welcome back ${name}`}
          </div>
        )}
        <Upload />
      </div>

      <Modal
        isOpen={logoutModal}
        onClose={() => {
          setLogoutModal(false);
        }}
      >
        <div>Are you sure you want to logout?</div>
        <div className="w-full flex justify-center gap-4 mt-4">
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-2 rounded-xl"
          >
            yes
          </button>
          <button
            onClick={() => setLogoutModal(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded-xl"
          >
            No
          </button>
        </div>
      </Modal>
      <button
        className="fixed top-5 right-5"
        onClick={() => setLogoutModal(true)}
      >
        <img src={logout} alt="logout" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Dashboard;
