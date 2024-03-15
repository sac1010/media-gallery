import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="w-full">
      <AllRoutes />
      <ToastContainer/>
    </div>
  );
}

export default App;
