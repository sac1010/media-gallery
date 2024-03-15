import React, { useRef, useState } from "react";
import upload from "../assets/upload.svg";
import Modal from "./Modal";
import Spinner from "./Spinner";
import axios from "axios";
import { toast } from "react-toastify";

const Upload: React.FC = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    setFile(files[0]);
    if (
      !files[0].type.startsWith("image/") &&
      file?.type.startsWith("image/")
    ) {
      console.log("invalid file type");
      return;
    }

    setUploadModal(true);
  };

  const handleUpload = async () => {
    setLoading(true);
    let fileData = {
      name: file?.name,
      size: file ? file.size : 0 / 1000000,
      type: "",
    };
    if (file?.type.startsWith("image/")) {
      fileData.type = "image";
      console.log("Image file:", file);
    } else if (file?.type.startsWith("video/")) {
      fileData.type = "video";
      console.log("Video file:", file);
    }
    const data = new FormData();
    if (file) {
      data.append("file", file);
      data.append("upload_preset", "qlruhrhr");
      data.append("cloud_name", "dcmid4z9m");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dcmid4z9m/upload",
        data
      );
      toast.success("Upload Successful");
    }
    setLoading(false);
    setUploadModal(false);
  };

  return (
    <div
      className={`col-span-6 h-[42.5vh] flex justify-center items-center border-2 border-dashed border-gray-400 relative`}
    >
      <div className="absolute z-0 flex flex-col justify-center items-center">
        <img src={upload} className="w-10 h-10 opacity-50" alt="" />
        <div>Drag and drop or click to upload</div>
      </div>
      <input
        ref={inputRef}
        className="w-full h-full relative z-10 opacity-0 cursor-pointer"
        type="file"
        accept="image/*, video/*"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Modal
        isOpen={uploadModal}
        onClose={() => {
          if (inputRef.current) {
            inputRef.current.value = "";
          }
          setUploadModal(false);
        }}
      >
        <div className="flex flex-col gap-4 items-center">
          <input
            value={file?.name}
            //   onChange={(e)=>setFileName(e.target.value)}
            type="text"
            disabled
            className="border border-gray-500 px-2 w-[250px] h-10 rounded"
            placeholder="File name"
          />
          <button
            onClick={handleUpload}
            className="bg-gray-600 w-fit text-white px-4 py-2 rounded-lg"
          >
            Upload
          </button>
        </div>
      </Modal>
      {loading && <Spinner />}
    </div>
  );
};

export default Upload;
