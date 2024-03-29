import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { deleteMedia, fetchMediaByUser } from "../utils/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { MediaData } from "./Dashboard";
import Spinner from "../components/Spinner";
import trash from "../assets/trash.svg";
import Modal from "../components/Modal";

type Props = {};

const Gallery = (props: Props) => {
  const [user] = useAuthState(auth);
  const [mediaData, setMediaData] = useState<MediaData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaData | null>(null);
  const [deleteModalMedia, setDeleteModalMedia] = useState<MediaData | null>(
    null
  );

  const fetchData = async () => {
    setLoading(true);
    if (user) {
      try {
        const res = await fetchMediaByUser(user.uid);
        const data: MediaData[] = [];
        res.forEach((doc) => {
          data.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setMediaData(data);
      } catch (e: any) {
        console.log(e.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const openFullScreen = (media: MediaData) => {
    setSelectedMedia(media);
  };

  const closeFullScreen = () => {
    setSelectedMedia(null);
  };

  const handleDelete = () => {
    if (deleteModalMedia) {
      deleteMedia(deleteModalMedia.id);
      setDeleteModalMedia(null);
      fetchData();
    }
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex">
      <Sidebar />
      <div className="w-10/12 h-screen overflow-scroll p-6">
        <div className="w-full h-full grid grid-cols-12 gap-6">
          {mediaData?.map((media) => (
            <div
              key={media.id}
              className="col-span-3 h-[250px] bg-gray-100 relative"
            >
              {media.data.type === "image" ? (
                <img
                  onClick={() => openFullScreen(media)}
                  src={media.data.url}
                  className="object-contain h-[200px] w-full cursor-pointer"
                  alt=""
                />
              ) : (
                <video
                  onClick={() => openFullScreen(media)}
                  src={media.data.url}
                  className="object-contain h-[200px] w-full cursor-pointer"
                />
              )}
              <div className="w-full h-[50px] text-center flex justify-center items-center truncate">
                {media.data.name}
              </div>
              <button
                onClick={() => setDeleteModalMedia(media)}
                className="absolute bottom-3 right-3"
              >
                <img src={trash} className=" w-3 h-3" alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {loading && <Spinner />}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          {selectedMedia.data.type === "image" ? (
            <img
              src={selectedMedia.data.url}
              className="max-w-full max-h-full"
              alt=""
            />
          ) : (
            <video
              src={selectedMedia.data.url}
              className="max-w-full max-h-full"
              controls
            />
          )}
          <button
            onClick={closeFullScreen}
            className="absolute top-5 right-10 text-white p-5"
          >
            X
          </button>
        </div>
      )}
      {deleteModalMedia && (
        <Modal isOpen={true} onClose={() => setDeleteModalMedia(null)}>
          <div className="text-center">
            Are you sure you want to delete this file? <br />
            <button
              onClick={handleDelete}
              className="mt-4 bg-red-400 rounded-lg px-4 py-2 text-white"
            >
              Yes
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Gallery;
