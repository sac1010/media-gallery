// import { onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) {
      navigate("/login");
    }
  }, [user, loading]);

  return <>{children}</>;
};

export default PrivateRoute;
