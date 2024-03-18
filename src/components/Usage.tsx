import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { convertMediaData } from "../utils/utils";

type props = {
  mediaData: any;
};

const Usage = ({ mediaData }: props) => {
  let data;
  let total = 0;
  if (mediaData) {
    data = convertMediaData(mediaData);
    data.forEach((data) => {
      total += data.value;
    });
  }
  const colors = ["#a9d2ff", "#82b9ff"];

  return (
    <>
      {mediaData && data && data.length > 0 ? (
        <div className="col-span-6 h-[42.5vh] bg-gray-100 border-2 border-dashed border-gray-400">
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                isAnimationActive
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                payload={data.map((entry, index) => ({
                  value: `${entry.label} (${entry.value.toFixed(1)} MB)`,
                  type: "rect",
                  color: colors[index % colors.length],
                }))}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center">
            Total space used :{" "}
            {`${total.toFixed(1)} MB`}
          </div>
        </div>
      ) : (
        <div className="col-span-6 h-[42.5vh] bg-gray-100 border-2 border-dashed border-gray-400 flex items-center justify-center">
          No media uploaded
        </div>
      )}
    </>
  );
};

export default Usage;
