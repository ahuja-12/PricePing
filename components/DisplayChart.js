// "use client"
// import React from 'react'
// import { Chart } from 'react-charts';
// import { useEffect } from 'react';
// const DisplayChart = ({data}) => {

//     useEffect(() => {
//         console.log(data)
        
//     }, [])    
    
//     const primaryAxis = React.useMemo(() => ({
//     getValue: (datum) => datum.time,
//   }), []);

//   const secondaryAxes = React.useMemo(() => [
//     {
//       getValue: (datum) => datum.price,
//     },
//   ], []);

//     return (
//         <div className="size-64">
//             <Chart
//                 options={{
//                     data,
//                     primaryAxis,
//                     secondaryAxes,
//                 }}
//             />
//         </div>
//     )
// }

// export default DisplayChart
// "use client";
// import React, { useEffect } from "react";
// import { Chart } from "react-charts";

// const DisplayChart = ({ data }) => {
//   useEffect(() => {
//     console.log(data);
//   }, []);

//   const primaryAxis = React.useMemo(
//     () => ({
//       getValue: (datum) => datum.time,
//     }),
//     []
//   );

//   const secondaryAxes = React.useMemo(
//     () => [
//       {
//         getValue: (datum) => datum.price,
//       },
//     ],
//     []
//   );

//   return (
//     <div className="p-4">
//       {/* 🔥 Title rendered manually */}
//       <h2 className="text-xl font-bold mb-4 text-center">{data.title}</h2>

//       <div className="size-64 mx-auto">
//         <Chart
//           options={{
//             data: data.datasets,
//             primaryAxis,
//             secondaryAxes,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default DisplayChart;
// "use client";
// import React, { useEffect } from "react";
// import { Chart } from "react-charts";

// const DisplayChart = ({ data }) => {
//   useEffect(() => {
//     console.log(data);
//   }, [data]);

//   // Convert your data.datasets[0].data into react-charts format
//   const chartData = [
//     {
//       label: data.datasets[0].label,
//       data: data.labels.map((label, index) => ({
//         time: label,
//         price: data.datasets[0].data[index],
//       })),
//     },
//   ];

//   const primaryAxis = React.useMemo(
//     () => ({
//       getValue: (datum) => datum.time,
//     }),
//     []
//   );

//   const secondaryAxes = React.useMemo(
//     () => [
//       {
//         getValue: (datum) => datum.price,
//       },
//     ],
//     []
//   );

//   return (
//     <div className="p-4">
//       {/* ✅ Show product title */}
//       <h2 className="text-xl font-bold mb-4 text-center">{data.title}</h2>

//       <div className="size-64 mx-auto">
//         <Chart
//           options={{
//             data: [data.datasets[0].data], // wrap in array
//             primaryAxis,
//             secondaryAxes,
//           }}
//         />

//       </div>
//     </div>
//   );
// };

// export default DisplayChart;

// "use client";
// import React, { useEffect } from "react";
// import { Chart } from "react-charts";

// const DisplayChart = ({ data }) => {
//   useEffect(() => {
//     console.log("Chart data:", data);
//   }, [data]);

//   const primaryAxis = React.useMemo(
//     () => ({
//       getValue: (datum) => datum.time,
//     }),
//     []
//   );

//   const secondaryAxes = React.useMemo(
//     () => [
//       {
//         getValue: (datum) => datum.price,
//       },
//     ],
//     []
//   );

//   // ✅ Fallback for missing or malformed data
//   if (
//     !data ||
//     !data.datasets ||
//     !data.datasets[0] ||
//     !Array.isArray(data.datasets[0].data)
//   ) {
//     return <p className="text-red-500 text-center">No chart data available.</p>;
//   }
// return (
//   <div className="p-4">
//     <h2 className="text-xl font-bold mb-4 text-center">{data.title}</h2>

//     <div className="size-64 mx-auto">
//       <Chart
//         options={{
//           data: [
//             {
//               label: data.datasets[0].label,
//               data: data.labels.map((label, index) => ({
//                 time: label,
//                 price: data.datasets[0].data[index],
//               })),
//             },
//           ],
//           primaryAxis,
//           secondaryAxes,
//         }}
//       />
//     </div>
//   </div>
// );

// };

// export default DisplayChart;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Chart } from "react-charts";

// const DisplayChart = ({ asin }) => {
//   const [chartData, setChartData] = useState([]);
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchChartData() {
//       try {
//         const res = await fetch(`/api/getChartData?asin=${asin}`);
//         const data = await res.json();

//         if (data.length === 0) {
//           setChartData([]);
//           return;
//         }

//         setChartData(data);
//         setTitle(data[0].title || "Price Trend");
//       } catch (err) {
//         console.error("Error fetching chart data:", err);
//         setChartData([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchChartData();
//   }, [asin]);

//   const primaryAxis = React.useMemo(
//     () => ({
//       getValue: (datum) => datum.time,
//     }),
//     []
//   );

//   const secondaryAxes = React.useMemo(
//     () => [
//       {
//         getValue: (datum) => datum.price,
//       },
//     ],
//     []
//   );

//   if (loading) return <p className="text-center">Loading chart...</p>;

//   if (!chartData.length) {
//     return <p className="text-center text-red-500">No chart data available.</p>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>

//       <div className="size-64 mx-auto">
//         <Chart
//           options={{
//             data: [
//               {
//                 label: "Price (₹)",
//                 data: chartData.map((point) => ({
//                   time: point.time,
//                   price: point.price,
//                 })),
//               },
//             ],
//             primaryAxis,
//             secondaryAxes,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default DisplayChart;
"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-charts";

const DisplayChart = ({ asin }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/chart/${asin}`);
        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [asin]);

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.time,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.price,
      },
    ],
    []
  );

  if (!chartData?.labels || !chartData?.datasets || !chartData.datasets[0]) {
    return (
      <p className="text-center text-red-500">
        No chart data available.
      </p>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">{chartData.title}</h2>

      <div className="size-64 mx-auto">
        <Chart
          options={{
            data: [
              {
                label: chartData.datasets[0].label,
                data: chartData.labels.map((label, index) => ({
                  time: label,
                  price: chartData.datasets[0].data[index],
                })),
              },
            ],
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
  );
};

export default DisplayChart;
