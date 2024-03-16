import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const Sidebar = (props: Props) => {
  const { pathname } = useLocation();
  return (
    <div className="w-2/12 bg-gray-600 h-screen relative flex items-center justify-center">
      <div className="flex flex-col gap-5">
        <Link
          to="/"
          className={`${pathname === "/" ? "text-white text-xl" : ""} `}
        >
          Dashboard
        </Link>
        <Link
          to="/gallery"
          className={pathname === "/gallery" ? "text-white text-xl" : ""}
        >
          Gallery
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
