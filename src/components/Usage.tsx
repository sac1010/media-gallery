import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { convertMediaData } from "../utils/utils";

type props = {
  mediaData: any;
};

const Usage = ({ mediaData }: props) => {
  let data;
  if (mediaData) {
    data = convertMediaData(mediaData);
  }
  const COLORS = ["#a8ddb5", "#87c994", "#6cae75", "#4e934f", "#3c7326"];
  return (
    <>
      {data && data.length > 0 ? (
        <div className="col-span-6 h-[42.5vh] bg-gray-100 border-2 border-dashed border-gray-400">
          <ResponsiveContainer width="100%" height="100%">
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
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                payload={data.map((entry, index) => ({
                  value: entry.label,
                  type: "rect",
                  color: COLORS[index % COLORS.length],
                }))}
              />
            </PieChart>
          </ResponsiveContainer>
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
