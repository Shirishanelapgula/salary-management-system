import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is missing");
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 3000),

  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
};