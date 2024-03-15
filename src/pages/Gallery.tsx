import React from "react";
import Sidebar from "../components/Sidebar";

type Props = {};

const Gallery = (props: Props) => {
  return (
    <div className="w-full h-screen bg-gray-200">
      <Sidebar />
    </div>
  );
};

export default Gallery;
