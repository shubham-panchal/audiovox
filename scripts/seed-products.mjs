import nextEnv from "@next/env";
import mongoose from "mongoose";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

nextEnv.loadEnvConfig(process.cwd());

async function seedProducts() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Set MONGODB_URI before seeding the product catalog.");
  }

  const products = JSON.parse(
    await readFile(
      resolve(process.cwd(), "src/data/mock-products.json"),
      "utf8",
    ),
  );
  const slugs = new Set(products.map((product) => product.slug));
  if (slugs.size !== products.length) {
    throw new Error("The seed catalog contains duplicate product slugs.");
  }

  try {
    await mongoose.connect(uri, { bufferCommands: false });
    const collection = mongoose.connection.collection("products");
    await collection.createIndex({ slug: 1 }, { unique: true });

    const now = new Date();
    const result = await collection.bulkWrite(
      products.map((product) => ({
        updateOne: {
          filter: { slug: product.slug },
          update: {
            $set: { ...product, updatedAt: now },
            $setOnInsert: { createdAt: now },
          },
          upsert: true,
        },
      })),
    );
    console.log(
      `Seeded ${products.length} products (${result.upsertedCount} inserted, ${result.modifiedCount} updated).`,
    );
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts().catch((error) => {
  console.error("Product catalog seeding failed:", error);
  process.exitCode = 1;
});
