import admin from "firebase-admin";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase credentials
const serviceAccountPath = path.join(__dirname, "../config/firebaseConfig.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Firebase config file not found! Make sure it is in /src/config.");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
console.log("✅ Firebase initialized successfully!");

export { db };

