import React from "react";

const RecentUploads = ({ mediaData }: any) => {
  console.log(mediaData, "mm");
  return (
    <div className="col-span-12 bg-gray-100 h-[42.5vh] p-2 border-2 border-dashed border-gray-400">
      <div className="font-semibold text-lg">Recent uploads</div>
      <div className="w-full grid grid-cols-12 text-center mt-4">
        <div className="col-span-4 h-4 font-semibold">Name</div>
        <div className="col-span-4 h-4 font-semibold">Type</div>
        <div className="col-span-4 h-4 font-semibold">Size -mb</div>
      </div>
      {mediaData &&
        mediaData.slice(0, 4).map((data: any) => {
          return (
            <div className="-full grid grid-cols-12 text-center mt-4">
              <div className="col-span-4 overflow-hidden">{data.data.name}</div>
              <div className="col-span-4 "> {data.data.type}</div>
              <div className="col-span-4 "> {data.data.size.toFixed(1)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default RecentUploads;
