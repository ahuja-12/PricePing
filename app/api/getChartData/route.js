import { MongoClient } from "mongodb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const asin = searchParams.get("asin");

  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  const db = client.db("amazon");
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

  const chartData = raw.map((item) => ({
    time: new Date(item.time).toLocaleDateString(),
    price: item.price,
  }));

  return Response.json(chartData);
}
