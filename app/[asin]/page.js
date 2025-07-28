// "use client";
// import React from "react";
// import { Chart } from "react-charts";

// export default function Page({ params }) {
//     const data = React.useMemo(
//         () => [
//           {
//             label: "React Charts",
//             data: [
//               { date: new Date("2023-01-01"), stars: 100000 },
//               { date: new Date("2024-01-01"), stars: 202123 },
//             ],
//           },
//           {
//             label: "React Query",
//             data: [
//               { date: new Date("2023-01-01"), stars: 900000 },
//               { date: new Date("2024-01-01"), stars: 10234230 },
//             ],
//           },
//         ],
//         []
//       );
    
//       const primaryAxis = React.useMemo(() => ({
//         getValue: (datum) => datum.date,
//       }), []);
    
//       const secondaryAxes = React.useMemo(() => [
//         {
//           getValue: (datum) => datum.stars,
//         },
//       ], 
//       []
//     )
    
 
//   return <div>My Post: {params.asin}
//   <div style={{ width: "600px", height: "400px", margin: "50px auto" }}>
//     <div className="size-64">
//       <Chart
//         options={{
//           data,
//           primaryAxis,
//           secondaryAxes,
//         }}
//       />
//       </div>   
//     </div>
//   </div>
// }
// app/[asin]/page.js
// "use client";
// import Image from "next/image";
// import React from "react";
// import { use } from "react"; // 👈 required to unwrap async values
// import { Chart } from "react-charts";

// export default function Page({ params }) {
//   const { asin } = use(params); // ✅ unwrap promise using use()

//   const data = React.useMemo(
//     () => [
//       {
//         label: "React Charts",
//         data: [
//           { date: new Date("2023-01-01"), stars: 100000 },
//           { date: new Date("2024-01-01"), stars: 202123 },
//         ],
//       },
//       {
//         label: "React Query",
//         data: [
//           { date: new Date("2023-01-01"), stars: 900000 },
//           { date: new Date("2024-01-01"), stars: 10234230 },
//         ],
//       },
//     ],
//     []
//   );

//   const primaryAxis = React.useMemo(
//     () => ({
//       getValue: (datum) => datum.date,
//     }),
//     []
//   );

//   const secondaryAxes = React.useMemo(
//     () => [
//       {
//         getValue: (datum) => datum.stars,
//       },
//     ],
//     []
//   );

//   return (
//     <div>
//       <h2>Product ASIN: {asin}</h2>
//       <div style={{ width: "600px", height: "400px", margin: "50px auto" }}>
//         <Chart
//           options={{
//             data,
//             primaryAxis,
//             secondaryAxes,
//           }}
//         />
//       </div>
//     </div>
//   );
// }
// app/[asin]/page.js
// app/[asin]/page.js

// 'use client';

// import React from "react";
// import { useParams } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import { MongoClient } from "mongodb";
// import DisplayChart from "@/components/DisplayChart";
// const url = 'mongodb://127.0.0.1:27017'; // ✅ Forces IPv4

// const client = new MongoClient(url);
// const dbName = 'amazon';

// export default async function ProductChartPage({ params }) {
//   try {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("prices");
//   //...
// } catch (err) {
//   console.error("DB ERROR:", err);
// } 
//   // const params = useParams();


// //   const data = [
// //   {
// //     label: 'Product',
// //     data: [
// //       { date: "2024-01-01", price: 1299 },
// //       { date: "2024-06-01", price: 1149 },
// //     ],
// //   },
// // ];
// let asin = params.asin
// const data = await collection.aggregate([
//   {
//     $match: {
//       asin: asin.toUpperCase() // Convert to uppercase to match the case
//     }
//   },
//   {
//     $group: {
//       _id: "$asin",
//       data: {
//         $push: {
//           time: { $dayOfMonth: "$time" },
//           price: { $toInt: "$priceInt" } // Convert priceInt to integer
//         }
//       }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       label: "Product",
//       data: "$data"
//     }
//   }
// ]).toArray();
// console.log(data)
  
//   return <div>
//     <Navbar/>
//     Track Price for: {params.asin}
//     <DisplayChart data = {data}/>
      
//       </div>
    
  
// }
// ye sahi tha-------------
// import Navbar from "@/components/Navbar";
// import { MongoClient } from "mongodb";
// import DisplayChart from "@/components/DisplayChart";

// const url = 'mongodb://127.0.0.1:27017';
// const dbName = 'amazon';

// async function getChartData(asin) {
//   const client = new MongoClient(url);
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("prices");

//   const data = await collection.aggregate([
//     {
//       $match: {
//         asin: asin.toUpperCase(),
//       },
//     },
//     {
//       $group: {
//         _id: "$asin",
//         data: {
//           $push: {
//             time: { $dayOfMonth: "$time" },
//             price: { $toInt: "$priceInt" },
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         label: "Product",
//         data: "$data",
//       },
//     },
//   ]).toArray();

//   await client.close();
//   return data;
// }

// export default async function ProductChartPage({ params }) {
//   const data = await getChartData(params.asin);
//   return (
//     <div>
//       <Navbar />
//       <h2 className="text-xl font-bold p-4">Track Price for: {params.asin}</h2>
//       <DisplayChart data={data} />
//     </div>
//   );
// }
// import Navbar from "@/components/Navbar";
// import { MongoClient } from "mongodb";
// import DisplayChart from "@/components/DisplayChart";

// const url = "mongodb://127.0.0.1:27017";
// const dbName = "amazon";

// async function getChartData(asin) {
//   const client = new MongoClient(url);
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("prices");

//   const rawData = await collection
//     .find({ asin: asin.toUpperCase() })
//     .sort({ time: 1 })
//     .toArray();

//   await client.close();

//   if (!rawData.length) return null;

//   return {
//     label: rawData[0].title,
//     labels: rawData.map((entry) =>
//       new Date(entry.time).toLocaleDateString()
//     ),
//     datasets: [
//       {
//         label: "Price (₹)",
//         data: rawData.map((entry) => parseInt(entry.priceInt)),
//         borderColor: "rgba(75,192,192,1)",
//         backgroundColor: "rgba(75,192,192,0.2)",
//         fill: false,
//         tension: 0.1,
//       },
//     ],
//   };
// }

// export default async function ProductChartPage({ params }) {
//   const data = await getChartData(params.asin);

//   return (
//     <div>
//       <Navbar />
//       <h2 className="text-xl font-bold p-4">Track Price for: {params.asin}</h2>
//       {data ? <DisplayChart data={data} /> : <p>No data found for this product.</p>}
//     </div>
//   );
// }
// import Navbar from "@/components/Navbar";
// import { MongoClient } from "mongodb";
// import DisplayChart from "@/components/DisplayChart";

// const url = "mongodb://127.0.0.1:27017";
// const dbName = "amazon";

// async function getChartData(asin) {
//   const client = new MongoClient(url);
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("prices");

//   // const raw = await collection
//   //   .aggregate([
//   //     { $match: { asin: asin.toUpperCase() } },
//   //     {
//   //       $project: {
//   //         time: 1,
//   //         price: { $toInt: "$priceInt" },
//   //       },
//   //     },
//   //     { $sort: { time: 1 } },
//   //   ])
//   //   .toArray();
//   const raw = await collection
//   .aggregate([
//     { $match: { asin: asin.toUpperCase() } },
//     {
//       $project: {
//         time: 1,
//         price: { $toInt: "$priceInt" },
//         title: 1,
//       },
//     },
//     { $sort: { time: 1 } },
//   ])
//   .toArray();


//   await client.close();

//   // ✅ Convert raw Mongo data into labels and datasets for Chart.js
//   const labels = raw.map((item) => new Date(item.time).toLocaleDateString());
//   const prices = raw.map((item) => item.price);

//   return {
//     labels,
//     datasets: [
//       {
//         label: "Price ₹",
//         data: prices,
//         borderColor: "rgb(75, 192, 192)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//       },
//     ],
//   };
// }

// export default async function ProductChartPage({ params }) {
//   const data = await getChartData(params.asin);

//   return (
//     <div>
//       <Navbar />
//       <h2 className="text-xl font-bold p-4">Track Price for: {params.asin}</h2>
//       <DisplayChart data={data} />
//     </div>
//   );
// }
// import Navbar from "@/components/Navbar";
// import { MongoClient } from "mongodb";
// import DisplayChart from "@/components/DisplayChart";

// const url = 'mongodb://127.0.0.1:27017';
// const dbName = 'amazon';

// async function getChartData(asin) {
//   const client = new MongoClient(url);
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("prices");

//   // ✅ Modified query to get title, time, price
//   const raw = await collection
//     .aggregate([
//       { $match: { asin: asin.toUpperCase() } },
//       {
//         $project: {
//           time: 1,
//           price: { $toInt: "$priceInt" },
//           title: 1,
//         },
//       },
//       { $sort: { time: 1 } },
//     ])
//     .toArray();

//   await client.close();

//   // ✅ Prepare labels (dates) and prices
//   const labels = raw.map((item) => new Date(item.time).toLocaleDateString());
//   const prices = raw.map((item) => item.price);
//   const title = raw[0]?.title || "Product Price";

//   return {
//     labels,
//     datasets: [
//       {
//         label: "Price (₹)",
//         data: prices,
//         borderColor: "rgb(75, 192, 192)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//       },
//     ],
//     title, // ✅ Pass title to chart
//   };
// }

// // ✅ Page component
// export default async function ProductChartPage({ params }) {
//   const data = await getChartData(params.asin);
//   return (
//     <div>
//       <Navbar />
//       <h2 className="text-xl font-bold p-4">Track Price for: {params.asin}</h2>
//       <DisplayChart data={data} />
//     </div>
//   );
// }
// import Navbar from "@/components/Navbar";
// import { MongoClient } from "mongodb";
// import DisplayChart from "@/components/DisplayChart";

// const url = "mongodb://127.0.0.1:27017";
// const dbName = "amazon";

// async function getChartData(asin) {
//   const client = new MongoClient(url);
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("prices");

//   const raw = await collection
//     .aggregate([
//       { $match: { asin: asin.toUpperCase() } },
//       {
//         $project: {
//           time: 1,
//           price: { $toInt: "$priceInt" },
//           title: 1,
//         },
//       },
//       { $sort: { time: 1 } },
//     ])
//     .toArray();

//   await client.close();

//   // ✅ Make sure there's data
//   if (!raw || raw.length === 0) return null;

//   const points = raw.map((item) => ({
//     time: new Date(item.time).toLocaleDateString(),
//     price: item.price,
//   }));

//   const title = raw[0]?.title || "Product Price";

//   return {
//     title,
//     datasets: [
//       {
//         label: "Price (₹)",
//         data: points, // ✅ This is the expected shape for react-charts
//       },
//     ],
//   };
// }

// export default async function ProductChartPage({ params }) {
//   const data = await getChartData(params.asin);

//   if (!data) {
//     return (
//       <div>
//         <Navbar />
//         <h2 className="text-xl font-bold p-4">
//           No price data found for: {params.asin}
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <h2 className="text-xl font-bold p-4">
//         Track Price for: {params.asin}
//       </h2>
//       <DisplayChart data={data} />
//     </div>
//   );
// }

// import Navbar from "@/components/Navbar";
// import { MongoClient } from "mongodb";
// import DisplayChart from "@/components/DisplayChart";

// const url = 'mongodb://127.0.0.1:27017';
// const dbName = 'amazon';

// async function getChartData(asin) {
//   const client = new MongoClient(url);
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("prices");

//   const raw = await collection
//     .aggregate([
//       { $match: { asin: asin.toUpperCase() } },
//       {
//         $project: {
//           time: 1,
//           price: { $toInt: "$priceInt" },
//           title: 1,
//         },
//       },
//       { $sort: { time: 1 } },
//     ])
//     .toArray();

//   await client.close();

//   // Convert raw data to proper chart format
//   const chartData = raw.map(item => ({
//     time: new Date(item.time).toLocaleDateString(),
//     price: item.price,
//   }));

//   return {
//     title: raw[0]?.title || "Product Price",
//     datasets: [
//       {
//         label: "Price (₹)",
//         data: chartData,
//       },
//     ],
//   };
// }

// export default async function ProductChartPage({ params }) {
//   const data = await getChartData(params.asin);

//   return (
//     <div>
//       <Navbar />
//       <h2 className="text-xl font-bold p-4">Track Price for: {params.asin}</h2>
//       <DisplayChart data={data} />
//     </div>
//   );
// }
// import Navbar from "@/components/Navbar";
// import { MongoClient } from "mongodb";
// import DisplayChart from "@/components/DisplayChart";
// import { use } from "react";

// // MongoDB setup
// const url = 'mongodb://127.0.0.1:27017';
// const dbName = 'amazon';

// // Fetch and format chart data
// async function getChartData(asin) {
//   const client = new MongoClient(url);
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("prices");

//   const raw = await collection.aggregate([
//     { $match: { asin: asin.toUpperCase() } },
//     {
//       $project: {
//         time: 1,
//         price: { $toInt: "$priceInt" },
//         title: 1,
//       },
//     },
//     { $sort: { time: 1 } },
//   ]).toArray();
//   console.log("Raw data from DB:", raw);


//   await client.close();

//   // Handle empty result
//   if (!raw || raw.length === 0) {
//     return {
//       title: "No Data Available",
//       labels: [],
//       datasets: [],
//     };
//   }

//   const chartData = raw.map(item => ({
//     time: new Date(item.time).toLocaleDateString(),
//     price: item.price,
//   }));

//   return {
//     title: raw[0].title || "Product Price",
//     labels: chartData.map((item) => item.time),         // ✅ Labels (dates)
//     datasets: [
//       {
//         label: "Price (₹)",
//         data: chartData.map((item) => item.price),       // ✅ Data (prices)
//       },
//     ],
//   };
// }


// // ✅ Page component (fix: unwrap params using React.use())
// export default function ProductChartPage({ params }) {
//   const resolvedParams = use(params); // ✅ Unwrap promise
//   const data = use(getChartData(resolvedParams.asin)); // ✅ Also unwrap data

//   return (
//     <div>
//       <Navbar />
//       <h2 className="text-xl font-bold p-4">Track Price for: {resolvedParams.asin}</h2>
//       <DisplayChart asin={params.asin} />

//     </div>
//   );
// }
import Navbar from "@/components/Navbar";
import { MongoClient } from "mongodb";
import DisplayChart from "@/components/DisplayChart";
import { use } from "react";

// MongoDB setup
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'amazon';

async function getChartData(asin) {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("prices");

  const raw = await collection.aggregate([
    { $match: { asin: asin.toUpperCase() } },
    {
      $project: {
        time: 1,
        price: { $toInt: "$priceInt" },
        title: 1,
      },
    },
    { $sort: { time: 1 } },
  ]).toArray();

  await client.close();

  if (!raw || raw.length === 0) {
    return {
      title: "No Data Available",
      labels: [],
      datasets: [],
    };
  }

  const chartData = raw.map(item => ({
    time: new Date(item.time).toLocaleDateString(),
    price: item.price,
  }));

  return {
    title: raw[0].title || "Product Price",
    labels: chartData.map((item) => item.time),
    datasets: [
      {
        label: "Price (₹)",
        data: chartData.map((item) => item.price),
      },
    ],
  };
}

// ✅ Fix: pass chart data to DisplayChart
export default function ProductChartPage({ params }) {
  const resolvedParams = use(params); // ✅ unwrap params
  const data = use(getChartData(resolvedParams.asin)); // ✅ unwrap Mongo fetch

  return (
    <div>
      <Navbar />
      <h2 className="text-xl font-bold p-4">Track Price for: {resolvedParams.asin}</h2>
      <DisplayChart data={data} /> {/* ✅ Fix here */}
    </div>
  );
}
