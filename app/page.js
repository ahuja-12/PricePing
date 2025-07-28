// //app/page.js
// import Image from "next/image";
// import React from "react";
// //import { Chart } from "react-charts";
// import Navbar from "@/components/navbar";  // 🔁 Capitalized import
// import { MongoClient } from "mongodb";


// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'amazon';

// export default async function Home() {
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('prices');
//   const findResult = await collection.aggregate([
//   {
//     $group: {
//       _id: "$asin",
//       title: { $first: "$t itle" }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       asin: "$_id",
//       title: 1
//     }
//   }
// ]).toArray();

//   console.log(findResult)

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto">
//         <h1 className="text-center font-bold text-3xl py-5">Welcome to Amazon Price Tracker</h1>
//         <div>
//           {findResult.map(item=>{
//             return <li className="my-4"> <Link href={`https://www.amazon.in/dp/${item.asin}`}><div>{item.title}</div></Link></li>
//           })}
          

//         </div>
//       </div>
      
//     </>
//   );
// }
// app/page.js

// // app/page.js
// import Link from "next/link";
// import Navbar from "@/components/Navbar";
// import { MongoClient } from "mongodb";

// // MongoDB connection
// // const url = "mongodb://localhost:27017";
// const url = 'mongodb://127.0.0.1:27017'; // ✅ Forces IPv4

// const client = new MongoClient(url);
// const dbName = "amazon";

// export default async function Home() {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("prices");

//   const findResult = await collection.aggregate([
//     {
//       $group: {
//         _id: "$asin",
//         title: { $first: "$title" } // ✅ fixed typo: "$title" → "$title"
//       }
//     },
//     {
//       $project: {
//         _id: 0,
//         asin: "$_id",
//         title: 1
//       }
//     }
//   ]).toArray();

//   return (
//     <>
//   <Navbar />
//   <div className="container mx-auto px-4">
//     <h1 className="text-center font-bold text-3xl py-5">
//       Welcome to Amazon Price Tracker
//     </h1>
//     <ul className="list-decimal font-bold">
//       {findResult.map((item) => (
//         <li key={item.asin} className="my-4">
//           <Link href={`/${item.asin}`}>
//             <div className="text-blue-600 hover:underline">{item.title}</div>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// </>
//   );
// }
// app/page.js
// import Link from "next/link";
// import Navbar from "@/components/Navbar";
// import { MongoClient } from "mongodb";

// const url = 'mongodb://127.0.0.1:27017';
// const dbName = "amazon";

// async function getData() {
//   const client = new MongoClient(url);
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("prices");

//   const findResult = await collection.aggregate([
//     {
//       $group: {
//         _id: "$asin",
//         title: { $first: "$title" },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         asin: "$_id",
//         title: 1,
//       },
//     },
//   ]).toArray();

//   await client.close(); // 🚨 Close connection
//   return findResult;
// }

// export default async function Home() {
//   const products = await getData();

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto px-4">
//         <h1 className="text-center font-bold text-3xl py-5">
//           Welcome to Amazon Price Tracker
//         </h1>
//         <ul className="list-decimal font-bold">
//           {products.map((item) => (
//             <li key={item.asin} className="my-4">
//               <Link href={`/${item.asin}`}>
//                 <div className="text-blue-600 hover:underline">{item.title}</div>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "amazon";

export default async function Home() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("prices");

    const findResult = await collection.aggregate([
      {
        $group: {
          _id: "$asin",
          title: { $first: "$title" }
        }
      },
      {
        $project: {
          _id: 0,
          asin: "$_id",
          title: 1
        }
      }
    ]).toArray();

    console.log("📦 Aggregated Result:", findResult);

    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4">
          <h1 className="text-center font-bold text-3xl py-5">
            Welcome to Amazon Price Tracker
          </h1>
          <ul className="list-decimal font-bold">
            {findResult.map((item) => (
              <li key={item.asin} className="my-4">
                <Link href={`/${item.asin}`}>
                  <div className="text-blue-600 hover:underline">{item.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  } catch (err) {
    console.error("❌ ERROR in Home():", err);
    return <div>Server error</div>;
  }
}
