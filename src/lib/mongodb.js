import "server-only";
import mongoose from "mongoose";

const cached = globalThis.mongooseConnection || {
  connection: null,
  promise: null,
};

if (!globalThis.mongooseConnection) {
  globalThis.mongooseConnection = cached;
}

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is required when CATALOG_MODE=mongodb.");
  }

  if (cached.connection && mongoose.connection.readyState === 1) {
    return cached.connection;
  }
  cached.connection = null;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { bufferCommands: false })
      .then((connection) => connection)
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }

  cached.connection = await cached.promise;
  return cached.connection;
}
